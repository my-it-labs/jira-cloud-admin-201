import { useCallback, useEffect, useMemo, useState } from 'react';
import { acierta, cargarBancos, montarIntento, puntuar } from './engine';
import type { ConfigExamen, DominioId, Intento, Pregunta } from './types';

type Vista = 'inicio' | 'examen' | 'resultados';

const STORAGE = 'acp620-intento';

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
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    cargarBancos()
      .then(({ config: c, preguntas }) => {
        setConfig(c);
        setPool(preguntas);
        try {
          const raw = sessionStorage.getItem(STORAGE);
          if (raw) {
            const saved = JSON.parse(raw) as Intento;
            if (saved?.preguntas?.length) {
              setIntento(saved);
              const elapsed = Math.floor((Date.now() - saved.iniciado) / 1000);
              setRestante(Math.max(0, saved.minutos * 60 - elapsed));
              setVista('examen');
            }
          }
        } catch {
          sessionStorage.removeItem(STORAGE);
        }
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'No se pudo cargar el banco'));
  }, []);

  const guardar = useCallback((next: Intento) => {
    setIntento(next);
    sessionStorage.setItem(STORAGE, JSON.stringify(next));
  }, []);

  const terminar = useCallback(() => {
    sessionStorage.removeItem(STORAGE);
    setConfirmando(false);
    setVista('resultados');
  }, []);

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
    const created = montarIntento(pool, config, modo, modulo);
    setIdx(0);
    setRestante(created.minutos * 60);
    guardar(created);
    setVista('examen');
  };

  const pregunta = intento?.preguntas[idx];
  const puntuacion = useMemo(() => (intento && vista === 'resultados' ? puntuar(intento) : null), [intento, vista]);

  const responder = (opcionId: string) => {
    if (!intento || !pregunta) return;
    const prev = intento.respuestas[pregunta.id] ?? [];
    let nextSel: string[];
    if (pregunta.tipo === 'multi') {
      nextSel = prev.includes(opcionId) ? prev.filter((x) => x !== opcionId) : [...prev, opcionId];
    } else {
      nextSel = [opcionId];
    }
    guardar({
      ...intento,
      respuestas: { ...intento.respuestas, [pregunta.id]: nextSel },
    });
  };

  const marcar = () => {
    if (!intento || !pregunta) return;
    const tiene = intento.marcadas.includes(pregunta.id);
    guardar({
      ...intento,
      marcadas: tiene ? intento.marcadas.filter((id) => id !== pregunta.id) : [...intento.marcadas, pregunta.id],
    });
  };

  const modulos = useMemo(() => [...new Set(pool.map((p) => p.modulo).filter(Boolean))] as string[], [pool]);

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
        onOficial={() => start('oficial')}
        onRapido={() => start('rapido')}
        onModulo={(m) => start('modulo', m)}
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
            <span className="muted"> · intento {intento.id}</span>
          </div>
          <div className={`reloj ${urgente ? 'urgente' : ''}`} aria-live="polite">
            {fmt(restante)}
          </div>
          <div className="muted">
            {contestadas}/{intento.preguntas.length} contestadas
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
                  onClick={() => setIdx(i)}
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
              <button type="button" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
                Anterior
              </button>
              <button
                type="button"
                disabled={idx === intento.preguntas.length - 1}
                onClick={() => setIdx((i) => i + 1)}
              >
                Siguiente
              </button>
              <button type="button" className="peligro" onClick={() => setConfirmando(true)}>
                Entregar examen
              </button>
            </footer>
          </section>
        </div>
        {confirmando && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="tarjeta">
              <h2>¿Entregar ahora?</h2>
              <p>
                Llevas {contestadas} de {intento.preguntas.length} contestadas.
                {contestadas < intento.preguntas.length ? ' Las en blanco cuentan como incorrectas.' : ''}
              </p>
              <div className="acciones">
                <button type="button" onClick={() => setConfirmando(false)}>
                  Seguir
                </button>
                <button type="button" className="peligro" onClick={terminar}>
                  Entregar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (vista === 'resultados' && intento && puntuacion && config) {
    const pasa = puntuacion.ratio >= config.corte;
    return (
      <main className="resultados">
        <header>
          <p className="muted">Intento {intento.id}</p>
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
          <button
            type="button"
            onClick={() => {
              setIntento(null);
              setVista('inicio');
            }}
          >
            Volver al inicio
          </button>
          <button type="button" className="primario" onClick={() => start(intento.modo, intento.filtroModulo)}>
            Nuevo intento (otro sorteo)
          </button>
        </footer>
      </main>
    );
  }

  return null;
}

function Inicio({
  config,
  pool,
  modulos,
  onOficial,
  onRapido,
  onModulo,
}: {
  config: ConfigExamen;
  pool: Pregunta[];
  modulos: string[];
  onOficial: () => void;
  onRapido: () => void;
  onModulo: (m: string) => void;
}) {
  const [modulo, setModulo] = useState(modulos[0] ?? 'M01');
  const corto = pool.length < config.preguntasObjetivo;
  return (
    <main className="inicio">
      <p className="kicker">{config.codigo}</p>
      <h1>{config.titulo}</h1>
      <p className="lead">{config.subtitulo}</p>
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
            {pool.length} preguntas en {modulos.length} JSON
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
          Práctica rápida (15)
        </button>
      </div>
      <div className="modulo-box">
        <label htmlFor="mod">Por módulo</label>
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
      <ul className="pesos">
        {(Object.keys(config.dominios) as DominioId[]).map((d) => (
          <li key={d}>
            {config.dominios[d].etiqueta} · {Math.round(config.dominios[d].peso * 100)}%
          </li>
        ))}
      </ul>
    </main>
  );
}
