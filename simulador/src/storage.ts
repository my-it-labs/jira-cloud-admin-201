import type { Intento } from './types';

const KEY = 'acp620-estado';
const LEGACY = 'acp620-intento';
const VERSION = 1;

export type Vista = 'inicio' | 'examen' | 'resultados';

export type EstadoGuardado = {
  version: number;
  vista: Vista;
  idx: number;
  intento: Intento | null;
};

function parsear(raw: string | null): EstadoGuardado | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as EstadoGuardado | Intento;
    if (data && 'preguntas' in data && Array.isArray((data as Intento).preguntas)) {
      const intento = data as Intento;
      if (!intento.preguntas.length) return null;
      return { version: VERSION, vista: 'examen', idx: 0, intento };
    }
    const estado = data as EstadoGuardado;
    if (estado?.version && estado.intento?.preguntas?.length) {
      return { ...estado, version: VERSION };
    }
  } catch {
    return null;
  }
  return null;
}

export function leerEstado(): EstadoGuardado | null {
  const actual = parsear(localStorage.getItem(KEY));
  if (actual) return actual;
  const legado = parsear(localStorage.getItem(LEGACY) ?? sessionStorage.getItem(LEGACY));
  if (legado) {
    escribirEstado(legado);
    localStorage.removeItem(LEGACY);
    sessionStorage.removeItem(LEGACY);
  }
  return legado;
}

export function escribirEstado(estado: EstadoGuardado): void {
  localStorage.setItem(KEY, JSON.stringify({ ...estado, version: VERSION }));
}

export function borrarEstado(): void {
  localStorage.removeItem(KEY);
  localStorage.removeItem(LEGACY);
  sessionStorage.removeItem(LEGACY);
}
