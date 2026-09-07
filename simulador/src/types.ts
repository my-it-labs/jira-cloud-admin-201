export type TipoPregunta = 'single' | 'multi';

export type DominioId =
  | 'project-creation'
  | 'board-configuration'
  | 'managing-projects'
  | 'automation'
  | 'reporting';

export type Opcion = {
  id: string;
  texto: string;
};

export type Pregunta = {
  id: string;
  dominio: DominioId;
  tipo: TipoPregunta;
  stem: string;
  opciones: Opcion[];
  correctas: string[];
  explicacion: string;
  modulo?: string;
};

export type Banco = {
  id: string;
  modulo: string;
  preguntas: Pregunta[];
};

export type ConfigExamen = {
  codigo: string;
  titulo: string;
  subtitulo: string;
  preguntasObjetivo: number;
  minutos: number;
  corte: number;
  dominios: Record<DominioId, { peso: number; etiqueta: string }>;
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
