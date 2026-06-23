export type StatusTarefa = "pendente" | "em_progresso" | "concluida";
export type PrioridadeTarefa = "baixa" | "media" | "alta";

export interface Subtarefa {
  id: string;
  titulo: string;
  concluida: boolean;
}

export interface Comentario {
  id: string;
  texto: string;
  criadoEm: Date;
}

export interface Tarefa {
  id: string;
  usuarioId: string;
  titulo: string;
  descricao?: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  dataVencimento?: Date;
  subtarefas: Subtarefa[];
  comentarios: Comentario[];
  criadoEm: Date;
  ocultoNoKanban?: boolean;
}
