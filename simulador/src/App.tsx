import { useCallback, useEffect, useMemo, useState } from 'react';
import { acierta, cargarBancos, montarIntento, puntuar } from './engine';
import { borrarEstado, escribirEstado, leerEstado } from './storage';
import type { Vista } from './storage';
import type { ConfigExamen, DominioId, Intento, Pregunta } from './types';

function fmt(segundos: number): string {
  const s = Math.max(0, segundos);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

function pct(n: number): string {
  return `${Math.round(n * 1000) / 10}%`;
}

export function App() {
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ConfigExamen | null>(null);
  const [pool, setPool] = useState<Pregunta[]>([]);
  const [vista, setVista] = useState<Vista>('inicio');
  const [intento, setIntento] = useState<Intento | null>(null);
  const [idx, setIdx] = useState(0);
  const [restante, setRestante] = useState(0);
  const [confirmando, setConfirmando] = useState<'entregar' | 'borrar' | null>(null);

  const persistir = useCallback((next: { vista?: Vista; idx?: number; intento?: Intento | null }) => {
    const vistaNext = next.vista ?? vista;
    const idxNext = next.idx ?? idx;
    const intentoNext = next.intento === undefined ? intento : next.intento;
    if (next.vista !== undefined) setVista(next.vista);
    if (next.idx !== undefined) setIdx(next.idx);
    if (next.intento !== undefined) setIntento(next.intento);
    escribirEstado({ version: 1, vista: vistaNext, idx: idxNext, intento: intentoNext });
  }, [vista, idx, intento]);

  useEffect(() => {
    cargarBancos()
      .then(({ config: c, preguntas }) => {
        setConfig(c);
        setPool(preguntas);
        const saved = leerEstado();
        if (!saved?.intento?.preguntas.length) return;
        const elapsed = Math.floor((Date.now() - saved.intento.iniciado) / 1000);
        const left = saved.intento.minutos * 60 - elapsed;
        setIntento(saved.intento);
        setIdx(Math.min(Math.max(0, saved.idx), saved.intento.preguntas.length - 1));
        if (!saved.intento.entregadoAt && left <= 0) {
          const cerrado = { ...saved.intento, entregadoAt: Date.now() };
          setIntento(cerrado);
          setRestante(0);
          setVista('resultados');
          escribirEstado({ version: 1, vista: 'resultados', idx: saved.idx, intento: cerrado });
          return;
        }
        setRestante(Math.max(0, left));
        setVista(saved.vista);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'No se pudo cargar el banco'));
  }, []);

  const terminar = useCallback(() => {
    if (!intento) return;
    setConfirmando(null);
    persistir({
      vista: 'resultados',
      intento: { ...intento, entregadoAt: intento.entregadoAt ?? Date.now() },
    });
  }, [persistir, intento]);

  useEffect(() => {
    if (vista !== 'examen' || !intento) return;
    const tick = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - intento.iniciado) / 1000);
      const left = intento.minutos * 60 - elapsed;
      setRestante(left);
      if (left <= 0) {
        window.clearInterval(tick);
        terminar();
      }
    }, 250);
    return () => window.clearInterval(tick);
  }, [vista, intento, terminar]);

  const start = (modo: Intento['modo'], modulo?: string) => {
    if (!config) return;
    if (intento && !intento.entregadoAt) {
      const ok = window.confirm('Hay un examen a medias en este navegador. ¿Empezar otro y borrar el actual?');
      if (!ok) return;
    }
    const created = montarIntento(pool, config, modo, modulo);
    setRestante(created.minutos * 60);
    persistir({ vista: 'examen', idx: 0, intento: created });
  };

  const irA = (i: number) => persistir({ idx: i });

  const borrarTodo = () => {
    borrarEstado();
    setIntento(null);
    setIdx(0);
    setRestante(0);
    setConfirmando(null);
    setVista('inicio');
  };

  const pregunta = intento?.preguntas[idx];
  const puntuacion = useMemo(() => (intento && vista === 'resultados' ? puntuar(intento) : null), [intento, vista]);
  const modulos = useMemo(() => [...new Set(pool.map((p) => p.modulo).filter(Boolean))] as string[], [pool]);

  const responder = (opcionId: string) => {
    if (!intento || !pregunta) return;
    const prev = intento.respuestas[pregunta.id] ?? [];
    const nextSel =
      pregunta.tipo === 'multi'
        ? prev.includes(opcionId)
          ? prev.filter((x) => x !== opcionId)
          : [...prev, opcionId]
        : [opcionId];
    persistir({
      intento: { ...intento, respuestas: { ...intento.respuestas, [pregunta.id]: nextSel } },
    });
  };

  const marcar = () => {
    if (!intento || !pregunta) return;
    const tiene = intento.marcadas.includes(pregunta.id);
    persistir({
      intento: {
        ...intento,
        marcadas: tiene ? intento.marcadas.filter((id) => id !== pregunta.id) : [...intento.marcadas, pregunta.id],
      },
    });
  };

  if (error) {
    return (
      <main className="pantalla-centro">
        <p className="error">{error}</p>
      </main>
    );
  }
  if (!config) {
    return (
      <main className="pantalla-centro">
        <p>Cargando bancos…</p>
      </main>
    );
  }

  if (vista === 'inicio') {
    return (
      <Inicio
        config={config}
        pool={pool}
        modulos={modulos}
        intento={intento}
        onOficial={() => start('oficial')}
        onRapido={() => start('rapido')}
        onModulo={(m) => start('modulo', m)}
        onContinuar={() => persistir({ vista: 'examen' })}
        onVerResultado={() => persistir({ vista: 'resultados' })}
        onBorrar={() => setConfirmando('borrar')}
        confirmando={confirmando === 'borrar'}
        onCancelarBorrar={() => setConfirmando(null)}
        onConfirmarBorrar={borrarTodo}
      />
    );
  }

  if (vista === 'examen' && intento && pregunta) {
    const contestadas = Object.keys(intento.respuestas).filter((id) => (intento.respuestas[id] ?? []).length > 0)
      .length;
    const seleccion = intento.respuestas[pregunta.id] ?? [];
    const urgente = restante <= 10 * 60;
    return (
      <div className="layout-examen">
        <header className="barra">
          <div>
            <strong>{config.codigo}</strong>
            <span className="muted-barra"> · intento {intento.id}</span>
          </div>
          <div className={`reloj ${urgente ? 'urgente' : ''}`} aria-live="polite">
            {fmt(restante)}
          </div>
          <div className="barra-acciones">
            <span className="muted-barra">
              {contestadas}/{intento.preguntas.length} contestadas
            </span>
            <button type="button" className="ghost-barra" onClick={() => persistir({ vista: 'inicio' })}>
              Salir (queda guardado)
            </button>
            <button type="button" className="ghost-barra" onClick={() => setConfirmando('borrar')}>
              Borrar progreso
            </button>
          </div>
        </header>
        <div className="cuerpo">
          <aside className="nav-preguntas" aria-label="Navegador de preguntas">
            {intento.preguntas.map((p, i) => {
              const done = (intento.respuestas[p.id] ?? []).length > 0;
              const flagged = intento.marcadas.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`chip ${i === idx ? 'activa' : ''} ${done ? 'hecha' : ''} ${flagged ? 'marcada' : ''}`}
                  onClick={() => irA(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </aside>
          <section className="pregunta">
            <div className="meta">
              <span>
                Pregunta {idx + 1} de {intento.preguntas.length}
              </span>
              <span className="dominio">{config.dominios[pregunta.dominio].etiqueta}</span>
              <button type="button" className={`flag ${intento.marcadas.includes(pregunta.id) ? 'on' : ''}`} onClick={marcar}>
                {intento.marcadas.includes(pregunta.id) ? 'Marcada para revisar' : 'Marcar para revisar'}
              </button>
            </div>
            <h1>{pregunta.stem}</h1>
            <p className="hint">
              {pregunta.tipo === 'multi' ? 'Selecciona todas las que apliquen.' : 'Selecciona una respuesta.'}
            </p>
            <ul className="opciones">
              {pregunta.opciones.map((op) => {
                const sel = seleccion.includes(op.id);
                return (
                  <li key={op.id}>
                    <button type="button" className={`opcion ${sel ? 'sel' : ''}`} onClick={() => responder(op.id)}>
                      <span className="letra">{op.id}</span>
                      <span>{op.texto}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <footer className="acciones">
              <button type="button" disabled={idx === 0} onClick={() => irA(idx - 1)}>
                Anterior
              </button>
              <button type="button" disabled={idx === intento.preguntas.length - 1} onClick={() => irA(idx + 1)}>
                Siguiente
              </button>
              <button type="button" className="peligro" onClick={() => setConfirmando('entregar')}>
                Entregar examen
              </button>
            </footer>
          </section>
        </div>
        {confirmando === 'entregar' && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="tarjeta">
              <h2>¿Entregar ahora?</h2>
              <p>
                Llevas {contestadas} de {intento.preguntas.length} contestadas.
                {contestadas < intento.preguntas.length ? ' Las en blanco cuentan como incorrectas.' : ''}
              </p>
              <div className="acciones">
                <button type="button" onClick={() => setConfirmando(null)}>
                  Seguir
                </button>
                <button type="button" className="peligro" onClick={terminar}>
                  Entregar
                </button>
              </div>
            </div>
          </div>
        )}
        {confirmando === 'borrar' && (
          <ConfirmBorrar onCancel={() => setConfirmando(null)} onOk={borrarTodo} />
        )}
      </div>
    );
  }

  if (vista === 'resultados' && intento && puntuacion && config) {
    const pasa = puntuacion.ratio >= config.corte;
    return (
      <main className="resultados">
        <header>
          <p className="muted">Intento {intento.id} · guardado en este navegador</p>
          <h1>{pasa ? 'Apto (simulacro)' : 'No apto (simulacro)'}</h1>
          <p className="score">
            {puntuacion.ok} / {puntuacion.total} · {pct(puntuacion.ratio)} · corte {pct(config.corte)}
          </p>
          <p className="aviso">
            Autoevaluación del curso. No es el examen oficial de Atlassian ni un dump: las preguntas son originales.
          </p>
        </header>
        <section>
          <h2>Por dominio</h2>
          <ul className="dominios">
            {(Object.keys(config.dominios) as DominioId[]).map((d) => {
              const row = puntuacion.porDominio[d] ?? { ok: 0, total: 0 };
              const r = row.total === 0 ? 0 : row.ok / row.total;
              return (
                <li key={d}>
                  <div className="dom-cab">
                    <span>{config.dominios[d].etiqueta}</span>
                    <span>
                      {row.ok}/{row.total} ({pct(r)})
                    </span>
                  </div>
                  <div className="barra-dom">
                    <i style={{ width: `${Math.round(r * 100)}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h2>Revisión</h2>
          <ol className="revision">
            {intento.preguntas.map((p, i) => {
              const ok = acierta(p, intento.respuestas[p.id]);
              const dadas = intento.respuestas[p.id] ?? [];
              return (
                <li key={p.id} className={ok ? 'ok' : 'ko'}>
                  <h3>
                    {i + 1}. {p.stem}
                  </h3>
                  <p>
                    Tu respuesta: {dadas.length ? dadas.join(', ') : '—'} · Correcta: {p.correctas.join(', ')}
                  </p>
                  <ul>
                    {p.opciones.map((op) => (
                      <li key={op.id}>
                        <strong>{op.id}.</strong> {op.texto}
                      </li>
                    ))}
                  </ul>
                  <p className="explicacion">{p.explicacion}</p>
                </li>
              );
            })}
          </ol>
        </section>
        <footer className="acciones">
          <button type="button" onClick={() => persistir({ vista: 'inicio' })}>
            Volver al inicio
          </button>
          <button type="button" className="primario" onClick={() => start(intento.modo, intento.filtroModulo)}>
            Nuevo intento (otro sorteo)
          </button>
          <button type="button" className="peligro" onClick={() => setConfirmando('borrar')}>
            Borrar progreso
          </button>
        </footer>
        {confirmando === 'borrar' && (
          <ConfirmBorrar onCancel={() => setConfirmando(null)} onOk={borrarTodo} />
        )}
      </main>
    );
  }

  return null;
}

function ConfirmBorrar({ onCancel, onOk }: { onCancel: () => void; onOk: () => void }) {
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="tarjeta">
        <h2>¿Borrar el progreso de este navegador?</h2>
        <p>Se elimina el intento, las respuestas y el último resultado guardados en localStorage. No se puede deshacer.</p>
        <div className="acciones">
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="peligro" onClick={onOk}>
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  );
}

function Inicio({
  config,
  pool,
  modulos,
  intento,
  onOficial,
  onRapido,
  onModulo,
  onContinuar,
  onVerResultado,
  onBorrar,
  confirmando,
  onCancelarBorrar,
  onConfirmarBorrar,
}: {
  config: ConfigExamen;
  pool: Pregunta[];
  modulos: string[];
  intento: Intento | null;
  onOficial: () => void;
  onRapido: () => void;
  onModulo: (m: string) => void;
  onContinuar: () => void;
  onVerResultado: () => void;
  onBorrar: () => void;
  confirmando: boolean;
  onCancelarBorrar: () => void;
  onConfirmarBorrar: () => void;
}) {
  const [modulo, setModulo] = useState(modulos[0] ?? 'M01');
  const corto = pool.length < config.preguntasObjetivo;
  const porBanco = modulos.length ? Math.round(pool.length / modulos.length) : 0;
  const aMedias = Boolean(intento);
  return (
    <main className="inicio">
      <p className="kicker">{config.codigo}</p>
      <h1>{config.titulo}</h1>
      <p className="lead">{config.subtitulo}</p>
      {aMedias && (
        <div className="aviso">
          <p>
            Hay progreso guardado en <strong>este navegador</strong> (intento {intento!.id}). Recargar o cerrar la pestaña no
            lo borra.
          </p>
          <div className="acciones">
            {!intento!.entregadoAt ? (
              <button type="button" className="primario" onClick={onContinuar}>
                Continuar examen
              </button>
            ) : (
              <button type="button" className="primario" onClick={onVerResultado}>
                Ver último resultado
              </button>
            )}
            <button type="button" className="peligro" onClick={onBorrar}>
              Borrar progreso
            </button>
          </div>
        </div>
      )}
      <dl className="ficha">
        <div>
          <dt>Formato oficial (aprox.)</dt>
          <dd>
            {config.preguntasObjetivo} preguntas · {config.minutos} min · corte {pct(config.corte)}
          </dd>
        </div>
        <div>
          <dt>Banco de este curso</dt>
          <dd>
            {modulos.length} módulos × {porBanco} ítems. El cronometrado sortea {config.preguntasObjetivo}. Por módulo,{' '}
            {config.preguntasPorModulo} al azar.
          </dd>
        </div>
      </dl>
      {corto && (
        <p className="aviso">
          Aún hay menos de {config.preguntasObjetivo} ítems: el simulacro usa todo el banco, baraja orden y opciones, y
          ajusta el tiempo. Añade más JSON en <code>public/data/bancos/</code> para acercarte al tamaño real.
        </p>
      )}
      <div className="modos">
        <button type="button" className="primario" onClick={onOficial}>
          Examen cronometrado
        </button>
        <button type="button" onClick={onRapido}>
          Práctica rápida ({config.preguntasRapido})
        </button>
      </div>
      <div className="modulo-box">
        <label htmlFor="mod">Por módulo ({config.preguntasPorModulo} de {porBanco} al azar)</label>
        <select id="mod" value={modulo} onChange={(e) => setModulo(e.target.value)}>
          {modulos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => onModulo(modulo)}>
          Empezar
        </button>
      </div>
      <p className="hint">
        El estado (pregunta actual, respuestas, marcas y resultado) se guarda en localStorage de este navegador, no en un
        servidor. Un botón de <em>Borrar progreso</em> lo deja a cero.
      </p>
      <ul className="pesos">
        {(Object.keys(config.dominios) as DominioId[]).map((d) => (
          <li key={d}>
            {config.dominios[d].etiqueta} · {Math.round(config.dominios[d].peso * 100)}%
          </li>
        ))}
      </ul>
      {confirmando && <ConfirmBorrar onCancel={onCancelarBorrar} onOk={onConfirmarBorrar} />}
    </main>
  );
}
