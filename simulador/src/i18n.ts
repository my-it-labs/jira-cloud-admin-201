export type Lang = 'es' | 'en';

export type I18nText = string | { es: string; en: string };

const LANG_KEY = 'acp620-lang';

export function txt(value: I18nText | undefined, lang: Lang): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return (value[lang] || value.es || value.en || '').trim();
}

export function leerIdioma(): Lang {
  const v = localStorage.getItem(LANG_KEY);
  return v === 'en' || v === 'es' ? v : 'es';
}

export function guardarIdioma(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export const ui = {
  es: {
    loading: 'Cargando bancos…',
    loadError: 'No se pudo cargar el banco',
    officialFmt: 'Formato oficial (aprox.)',
    bank: 'Banco de este curso',
    bankDetail: (mods: number, per: number, n: number, modN: number) =>
      `${mods} módulos × ${per} ítems. El cronometrado sortea ${n} de todo el curso. Por módulo, ${modN} al azar de ese temario.`,
    timed: 'Examen cronometrado',
    quick: (n: number) => `Práctica rápida (${n})`,
    byModule: (n: number, per: number) => `Por módulo (${n} de ${per} de ese temario)`,
    start: 'Empezar',
    continue: 'Continuar examen',
    lastResult: 'Ver último resultado',
    clear: 'Borrar progreso',
    saved: (id: string) =>
      `Hay progreso guardado en este navegador (intento ${id}). Recargar o cerrar la pestaña no lo borra.`,
    storageHint:
      'El estado se guarda en localStorage de este navegador, no en un servidor. Borrar progreso lo deja a cero.',
    examLang: 'El examen oficial ACP-620 es en inglés. Cambia el idioma cuando quieras; el intento no se reinicia.',
    answered: (a: number, t: number) => `${a}/${t} contestadas`,
    exit: 'Salir (queda guardado)',
    question: (i: number, t: number) => `Pregunta ${i} de ${t}`,
    flagOn: 'Marcada para revisar',
    flagOff: 'Marcar para revisar',
    pickOne: 'Selecciona una respuesta.',
    pickMulti: 'Selecciona todas las que apliquen.',
    prev: 'Anterior',
    next: 'Siguiente',
    submit: 'Entregar examen',
    submitNow: '¿Entregar ahora?',
    blanks: (a: number, t: number) =>
      `Llevas ${a} de ${t} contestadas.` + (a < t ? ' Las en blanco cuentan como incorrectas.' : ''),
    keepGoing: 'Seguir',
    handIn: 'Entregar',
    clearTitle: '¿Borrar el progreso de este navegador?',
    clearBody:
      'Se elimina el intento, las respuestas y el último resultado guardados en localStorage. No se puede deshacer.',
    cancel: 'Cancelar',
    clearAll: 'Borrar todo',
    attemptSaved: (id: string) => `Intento ${id} · guardado en este navegador`,
    pass: 'Apto (simulacro)',
    fail: 'No apto (simulacro)',
    cut: 'corte',
    disclaimer:
      'Autoevaluación del curso. No es el examen oficial de Atlassian ni un dump: las preguntas son originales.',
    byDomain: 'Por dominio',
    review: 'Revisión',
    yourAnswer: 'Tu respuesta',
    correct: 'Correcta',
    home: 'Volver al inicio',
    newAttempt: 'Nuevo intento (otro sorteo)',
    overwrite: 'Hay un examen a medias en este navegador. ¿Empezar otro y borrar el actual?',
    navigator: 'Navegador de preguntas',
    short: (n: number) =>
      `Aún hay menos de ${n} ítems: el simulacro usa todo el banco, baraja orden y opciones, y ajusta el tiempo.`,
  },
  en: {
    loading: 'Loading question banks…',
    loadError: 'Could not load the question bank',
    officialFmt: 'Official format (approx.)',
    bank: 'This course bank',
    bankDetail: (mods: number, per: number, n: number, modN: number) =>
      `${mods} modules × ${per} items. The timed exam draws ${n} from the whole course. Per module, ${modN} at random from that module only.`,
    timed: 'Timed exam',
    quick: (n: number) => `Quick practice (${n})`,
    byModule: (n: number, per: number) => `By module (${n} of ${per} from that syllabus)`,
    start: 'Start',
    continue: 'Resume exam',
    lastResult: 'View last result',
    clear: 'Clear progress',
    saved: (id: string) =>
      `Progress is saved in this browser (attempt ${id}). Reloading or closing the tab does not delete it.`,
    storageHint: 'State is stored in this browser’s localStorage, not on a server. Clear progress resets it.',
    examLang: 'The official ACP-620 exam is in English. Switch language at any time; your attempt is kept.',
    answered: (a: number, t: number) => `${a}/${t} answered`,
    exit: 'Exit (saved)',
    question: (i: number, t: number) => `Question ${i} of ${t}`,
    flagOn: 'Flagged for review',
    flagOff: 'Flag for review',
    pickOne: 'Select one answer.',
    pickMulti: 'Select all that apply.',
    prev: 'Previous',
    next: 'Next',
    submit: 'Submit exam',
    submitNow: 'Submit now?',
    blanks: (a: number, t: number) =>
      `You have answered ${a} of ${t}.` + (a < t ? ' Blank items count as incorrect.' : ''),
    keepGoing: 'Continue',
    handIn: 'Submit',
    clearTitle: 'Clear progress for this browser?',
    clearBody: 'This deletes the attempt, answers, and last result stored in localStorage. It cannot be undone.',
    cancel: 'Cancel',
    clearAll: 'Clear all',
    attemptSaved: (id: string) => `Attempt ${id} · saved in this browser`,
    pass: 'Pass (practice)',
    fail: 'Fail (practice)',
    cut: 'cut score',
    disclaimer:
      'Course self-assessment. This is not the official Atlassian exam and not a dump: items are original.',
    byDomain: 'By domain',
    review: 'Review',
    yourAnswer: 'Your answer',
    correct: 'Correct',
    home: 'Back to start',
    newAttempt: 'New attempt (new draw)',
    overwrite: 'An exam is in progress in this browser. Start another and discard the current one?',
    navigator: 'Question navigator',
    short: (n: number) =>
      `The bank still has fewer than ${n} items: the simulator uses all of them, shuffles order and options, and scales time.`,
  },
} as const;
