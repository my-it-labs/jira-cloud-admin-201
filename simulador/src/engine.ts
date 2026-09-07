import type { Banco, ConfigExamen, DominioId, Intento, Pregunta, PreguntaExamen } from './types';

function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedDesdeCrypto(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0]!;
}

function barajar<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function letras(): string[] {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
}

export function mezclarOpciones(p: Pregunta, rand: () => number): PreguntaExamen {
  const mezcladas = barajar(p.opciones, rand);
  const ids = letras();
  const mapa: Record<string, string> = {};
  const opciones = mezcladas.map((op, i) => {
    const nuevo = ids[i]!;
    mapa[op.id] = nuevo;
    return { id: nuevo, texto: op.texto };
  });
  return {
    ...p,
    opciones,
    correctas: p.correctas.map((c) => mapa[c]!).filter(Boolean),
  };
}

function tomarPorDominio(
  pool: Pregunta[],
  n: number,
  pesos: Record<DominioId, { peso: number }>,
  rand: () => number,
): Pregunta[] {
  const porDom = new Map<DominioId, Pregunta[]>();
  for (const p of pool) {
    const lista = porDom.get(p.dominio) ?? [];
    lista.push(p);
    porDom.set(p.dominio, lista);
  }
  for (const [k, lista] of porDom) {
    porDom.set(k, barajar(lista, rand));
  }

  const dominios = Object.keys(pesos) as DominioId[];
  const cupos: Record<DominioId, number> = {} as Record<DominioId, number>;
  let asignadas = 0;
  for (const d of dominios) {
    const disponibles = porDom.get(d)?.length ?? 0;
    const ideal = Math.round(n * pesos[d].peso);
    const c = Math.min(disponibles, ideal);
    cupos[d] = c;
    asignadas += c;
  }
  let resto = n - asignadas;
  const sobra = barajar(
    dominios.flatMap((d) => {
      const lista = porDom.get(d) ?? [];
      return lista.slice(cupos[d]).map((p) => ({ d, p }));
    }),
    rand,
  );
  for (const item of sobra) {
    if (resto <= 0) break;
    cupos[item.d] += 1;
    resto -= 1;
  }

  const elegidas: Pregunta[] = [];
  for (const d of dominios) {
    elegidas.push(...(porDom.get(d) ?? []).slice(0, cupos[d]));
  }
  if (elegidas.length < n) {
    const ids = new Set(elegidas.map((p) => p.id));
    const extra = barajar(
      pool.filter((p) => !ids.has(p.id)),
      rand,
    );
    elegidas.push(...extra.slice(0, n - elegidas.length));
  }
  return barajar(elegidas.slice(0, n), rand);
}

export function montarIntento(
  pool: Pregunta[],
  config: ConfigExamen,
  modo: Intento['modo'],
  filtroModulo?: string,
): Intento {
  const seed = seedDesdeCrypto();
  const rand = mulberry32(seed);
  let base = pool;
  if (filtroModulo) {
    base = pool.filter((p) => p.modulo === filtroModulo);
  }
  const objetivo =
    modo === 'rapido'
      ? Math.min(config.preguntasRapido, base.length)
      : modo === 'modulo'
        ? Math.min(config.preguntasPorModulo, base.length)
        : Math.min(config.preguntasObjetivo, base.length);
  const seleccion =
    modo === 'oficial'
      ? tomarPorDominio(base, objetivo, config.dominios, rand)
      : barajar(base, rand).slice(0, objetivo);
  const preguntas = seleccion.map((p) => mezclarOpciones(p, rand));
  const minutos =
    modo === 'oficial' && preguntas.length >= config.preguntasObjetivo
      ? config.minutos
      : Math.max(15, Math.round((config.minutos * preguntas.length) / config.preguntasObjetivo));
  return {
    id: seed.toString(16).padStart(8, '0'),
    modo,
    filtroModulo,
    iniciado: Date.now(),
    minutos,
    preguntas,
    respuestas: {},
    marcadas: [],
  };
}

export function acierta(p: PreguntaExamen, dadas: string[] | undefined): boolean {
  const d = [...(dadas ?? [])].sort();
  const c = [...p.correctas].sort();
  return d.length === c.length && d.every((x, i) => x === c[i]);
}

export function puntuar(intento: Intento) {
  let ok = 0;
  const porDominio: Record<string, { ok: number; total: number }> = {};
  for (const p of intento.preguntas) {
    const d = p.dominio;
    porDominio[d] ??= { ok: 0, total: 0 };
    porDominio[d].total += 1;
    if (acierta(p, intento.respuestas[p.id])) {
      ok += 1;
      porDominio[d].ok += 1;
    }
  }
  const total = intento.preguntas.length;
  const ratio = total === 0 ? 0 : ok / total;
  return { ok, total, ratio, porDominio };
}

export function dataUrl(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}data/${path.replace(/^\//, '')}`;
}

export async function cargarBancos(): Promise<{ config: ConfigExamen; preguntas: Pregunta[] }> {
  const config = (await (await fetch(dataUrl('config.json'))).json()) as ConfigExamen;
  const indice = (await (await fetch(dataUrl('index.json'))).json()) as { bancos: string[] };
  const bancos = await Promise.all(
    indice.bancos.map(async (rel) => {
      const r = await fetch(dataUrl(rel));
      if (!r.ok) throw new Error(`No se pudo cargar ${rel}`);
      return (await r.json()) as Banco;
    }),
  );
  const preguntas: Pregunta[] = [];
  for (const b of bancos) {
    for (const p of b.preguntas) {
      preguntas.push({ ...p, modulo: p.modulo ?? b.modulo });
    }
  }
  return { config, preguntas };
}
