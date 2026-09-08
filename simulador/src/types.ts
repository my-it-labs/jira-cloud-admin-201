import type { I18nText } from './i18n';

export type TipoPregunta = 'single' | 'multi';

export type DominioId =
  | 'project-creation'
  | 'board-configuration'
  | 'managing-projects'
  | 'automation'
  | 'reporting';

export type Opcion = {
  id: string;
  texto: I18nText;
};

export type Pregunta = {
  id: string;
  dominio: DominioId;
  tipo: TipoPregunta;
  stem: I18nText;
  opciones: Opcion[];
  correctas: string[];
  explicacion: I18nText;
  modulo?: string;
};

export type Banco = {
  id: string;
  modulo: string;
  preguntas: Pregunta[];
};

export type ConfigExamen = {
  codigo: string;
  titulo: I18nText;
  subtitulo: I18nText;
  preguntasObjetivo: number;
  preguntasPorModulo: number;
  preguntasRapido: number;
  minutos: number;
  corte: number;
  dominios: Record<DominioId, { peso: number; etiqueta: I18nText }>;
};

export type IndiceBancos = {
  bancos: string[];
};

export type PreguntaExamen = Pregunta & {
  opciones: Opcion[];
};

export type Intento = {
  id: string;
  modo: 'oficial' | 'modulo' | 'rapido';
  filtroModulo?: string;
  iniciado: number;
  minutos: number;
  preguntas: PreguntaExamen[];
  respuestas: Record<string, string[]>;
  marcadas: string[];
  entregadoAt?: number;
};
