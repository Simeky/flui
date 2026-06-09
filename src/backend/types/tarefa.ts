export type StatusTarefa = "pendente" | "em_progresso" | "concluida";

export interface Subtarefa {
  id: string;
  titulo: string;
  concluida: boolean;
}

export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  status: StatusTarefa;
  subtarefas: Subtarefa[];
  criadoEm: Date;
}
