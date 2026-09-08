import { useCallback, useEffect, useMemo, useState } from 'react';
import { acierta, cargarBancos, montarIntento, puntuar } from './engine';
import { guardarIdioma, leerIdioma, txt, ui, type Lang } from './i18n';
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

function LangSwitch({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button type="button" className={lang === 'es' ? 'on' : ''} onClick={() => onChange('es')}>
        ES
      </button>
      <button type="button" className={lang === 'en' ? 'on' : ''} onClick={() => onChange('en')}>
        EN
      </button>
    </div>
  );
}

export function App() {
  const [lang, setLangState] = useState<Lang>(() => leerIdioma());
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ConfigExamen | null>(null);
  const [pool, setPool] = useState<Pregunta[]>([]);
  const [vista, setVista] = useState<Vista>('inicio');
  const [intento, setIntento] = useState<Intento | null>(null);
  const [idx, setIdx] = useState(0);
  const [restante, setRestante] = useState(0);
  const [confirmando, setConfirmando] = useState<'entregar' | 'borrar' | null>(null);
  const copy = ui[lang];

  const setLang = (next: Lang) => {
    setLangState(next);
    guardarIdioma(next);
    document.documentElement.lang = next === 'en' ? 'en' : 'es';
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
  }, [lang]);

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
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'ERROR_LOAD'));
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
      if (!window.confirm(copy.overwrite)) return;
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
        <LangSwitch lang={lang} onChange={setLang} />
        <p className="error">{error === 'ERROR_LOAD' ? copy.loadError : error}</p>
      </main>
    );
  }
  if (!config) {
    return (
      <main className="pantalla-centro">
        <p>{copy.loading}</p>
      </main>
    );
  }

  if (vista === 'inicio') {
    return (
      <Inicio
        lang={lang}
        onLang={setLang}
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
            <span className="muted-barra"> · {intento.id}</span>
          </div>
          <div className={`reloj ${urgente ? 'urgente' : ''}`} aria-live="polite">
            {fmt(restante)}
          </div>
          <div className="barra-acciones">
            <LangSwitch lang={lang} onChange={setLang} />
            <span className="muted-barra">{copy.answered(contestadas, intento.preguntas.length)}</span>
            <button type="button" className="ghost-barra" onClick={() => persistir({ vista: 'inicio' })}>
              {copy.exit}
            </button>
            <button type="button" className="ghost-barra" onClick={() => setConfirmando('borrar')}>
              {copy.clear}
            </button>
          </div>
        </header>
        <div className="cuerpo">
          <aside className="nav-preguntas" aria-label={copy.navigator}>
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
              <span>{copy.question(idx + 1, intento.preguntas.length)}</span>
              <span className="dominio">{txt(config.dominios[pregunta.dominio].etiqueta, lang)}</span>
              <button type="button" className={`flag ${intento.marcadas.includes(pregunta.id) ? 'on' : ''}`} onClick={marcar}>
                {intento.marcadas.includes(pregunta.id) ? copy.flagOn : copy.flagOff}
              </button>
            </div>
            <h1>{txt(pregunta.stem, lang)}</h1>
            <p className="hint">{pregunta.tipo === 'multi' ? copy.pickMulti : copy.pickOne}</p>
            <ul className="opciones">
              {pregunta.opciones.map((op) => {
                const sel = seleccion.includes(op.id);
                return (
                  <li key={op.id}>
                    <button type="button" className={`opcion ${sel ? 'sel' : ''}`} onClick={() => responder(op.id)}>
                      <span className="letra">{op.id}</span>
                      <span>{txt(op.texto, lang)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <footer className="acciones">
              <button type="button" disabled={idx === 0} onClick={() => irA(idx - 1)}>
                {copy.prev}
              </button>
              <button type="button" disabled={idx === intento.preguntas.length - 1} onClick={() => irA(idx + 1)}>
                {copy.next}
              </button>
              <button type="button" className="peligro" onClick={() => setConfirmando('entregar')}>
                {copy.submit}
              </button>
            </footer>
          </section>
        </div>
        {confirmando === 'entregar' && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="tarjeta">
              <h2>{copy.submitNow}</h2>
              <p>{copy.blanks(contestadas, intento.preguntas.length)}</p>
              <div className="acciones">
                <button type="button" onClick={() => setConfirmando(null)}>
                  {copy.keepGoing}
                </button>
                <button type="button" className="peligro" onClick={terminar}>
                  {copy.handIn}
                </button>
              </div>
            </div>
          </div>
        )}
        {confirmando === 'borrar' && (
          <ConfirmBorrar lang={lang} onCancel={() => setConfirmando(null)} onOk={borrarTodo} />
        )}
      </div>
    );
  }

  if (vista === 'resultados' && intento && puntuacion && config) {
    const pasa = puntuacion.ratio >= config.corte;
    return (
      <main className="resultados">
        <header>
          <div className="inicio-top">
            <LangSwitch lang={lang} onChange={setLang} />
          </div>
          <p className="muted">{copy.attemptSaved(intento.id)}</p>
          <h1>{pasa ? copy.pass : copy.fail}</h1>
          <p className="score">
            {puntuacion.ok} / {puntuacion.total} · {pct(puntuacion.ratio)} · {copy.cut} {pct(config.corte)}
          </p>
          <p className="aviso">{copy.disclaimer}</p>
        </header>
        <section>
          <h2>{copy.byDomain}</h2>
          <ul className="dominios">
            {(Object.keys(config.dominios) as DominioId[]).map((d) => {
              const row = puntuacion.porDominio[d] ?? { ok: 0, total: 0 };
              const r = row.total === 0 ? 0 : row.ok / row.total;
              return (
                <li key={d}>
                  <div className="dom-cab">
                    <span>{txt(config.dominios[d].etiqueta, lang)}</span>
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
          <h2>{copy.review}</h2>
          <ol className="revision">
            {intento.preguntas.map((p, i) => {
              const ok = acierta(p, intento.respuestas[p.id]);
              const dadas = intento.respuestas[p.id] ?? [];
              return (
                <li key={p.id} className={ok ? 'ok' : 'ko'}>
                  <h3>
                    {i + 1}. {txt(p.stem, lang)}
                  </h3>
                  <p>
                    {copy.yourAnswer}: {dadas.length ? dadas.join(', ') : '—'} · {copy.correct}: {p.correctas.join(', ')}
                  </p>
                  <ul>
                    {p.opciones.map((op) => (
                      <li key={op.id}>
                        <strong>{op.id}.</strong> {txt(op.texto, lang)}
                      </li>
                    ))}
                  </ul>
                  <p className="explicacion">{txt(p.explicacion, lang)}</p>
                </li>
              );
            })}
          </ol>
        </section>
        <footer className="acciones">
          <button type="button" onClick={() => persistir({ vista: 'inicio' })}>
            {copy.home}
          </button>
          <button type="button" className="primario" onClick={() => start(intento.modo, intento.filtroModulo)}>
            {copy.newAttempt}
          </button>
          <button type="button" className="peligro" onClick={() => setConfirmando('borrar')}>
            {copy.clear}
          </button>
        </footer>
        {confirmando === 'borrar' && (
          <ConfirmBorrar lang={lang} onCancel={() => setConfirmando(null)} onOk={borrarTodo} />
        )}
      </main>
    );
  }

  return null;
}

function ConfirmBorrar({ lang, onCancel, onOk }: { lang: Lang; onCancel: () => void; onOk: () => void }) {
  const copy = ui[lang];
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="tarjeta">
        <h2>{copy.clearTitle}</h2>
        <p>{copy.clearBody}</p>
        <div className="acciones">
          <button type="button" onClick={onCancel}>
            {copy.cancel}
          </button>
          <button type="button" className="peligro" onClick={onOk}>
            {copy.clearAll}
          </button>
        </div>
      </div>
    </div>
  );
}

function Inicio({
  lang,
  onLang,
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
  lang: Lang;
  onLang: (l: Lang) => void;
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
  const copy = ui[lang];
  const [modulo, setModulo] = useState(modulos[0] ?? 'M01');
  const corto = pool.length < config.preguntasObjetivo;
  const porBanco = modulos.length ? Math.round(pool.length / modulos.length) : 0;
  const aMedias = Boolean(intento);
  return (
    <main className="inicio">
      <div className="inicio-top">
        <LangSwitch lang={lang} onChange={onLang} />
      </div>
      <p className="kicker">{config.codigo}</p>
      <h1>{txt(config.titulo, lang)}</h1>
      <p className="lead">{txt(config.subtitulo, lang)}</p>
      <p className="hint">{copy.examLang}</p>
      {aMedias && (
        <div className="aviso">
          <p>{copy.saved(intento!.id)}</p>
          <div className="acciones">
            {!intento!.entregadoAt ? (
              <button type="button" className="primario" onClick={onContinuar}>
                {copy.continue}
              </button>
            ) : (
              <button type="button" className="primario" onClick={onVerResultado}>
                {copy.lastResult}
              </button>
            )}
            <button type="button" className="peligro" onClick={onBorrar}>
              {copy.clear}
            </button>
          </div>
        </div>
      )}
      <dl className="ficha">
        <div>
          <dt>{copy.officialFmt}</dt>
          <dd>
            {config.preguntasObjetivo} · {config.minutos} min · {copy.cut} {pct(config.corte)}
          </dd>
        </div>
        <div>
          <dt>{copy.bank}</dt>
          <dd>{copy.bankDetail(modulos.length, porBanco, config.preguntasObjetivo, config.preguntasPorModulo)}</dd>
        </div>
      </dl>
      {corto && <p className="aviso">{copy.short(config.preguntasObjetivo)}</p>}
      <div className="modos">
        <button type="button" className="primario" onClick={onOficial}>
          {copy.timed}
        </button>
        <button type="button" onClick={onRapido}>
          {copy.quick(config.preguntasRapido)}
        </button>
      </div>
      <div className="modulo-box">
        <label htmlFor="mod">{copy.byModule(config.preguntasPorModulo, porBanco)}</label>
        <select id="mod" value={modulo} onChange={(e) => setModulo(e.target.value)}>
          {modulos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => onModulo(modulo)}>
          {copy.start}
        </button>
      </div>
      <p className="hint">{copy.storageHint}</p>
      <ul className="pesos">
        {(Object.keys(config.dominios) as DominioId[]).map((d) => (
          <li key={d}>
            {txt(config.dominios[d].etiqueta, lang)} · {Math.round(config.dominios[d].peso * 100)}%
          </li>
        ))}
      </ul>
      {confirmando && <ConfirmBorrar lang={lang} onCancel={onCancelarBorrar} onOk={onConfirmarBorrar} />}
    </main>
  );
}
