import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { getFirestoreDb } from '../lib/firebase';
import { Tarefa } from '../types/tarefa';

function obterColecaoTarefas() {
  return collection(getFirestoreDb(), 'tarefas');
}

const converterDeFirestore = (docData: any, id: string): Tarefa => { 
  return { 
    id, 
    usuarioId: docData.usuarioId, 
    titulo: docData.titulo, 
    descricao: docData.descricao, 
    status: docData.status, 
    prioridade: docData.prioridade, 
    dataVencimento: docData.dataVencimento ? docData.dataVencimento.toDate() : undefined, 
    subtarefas: docData.subtarefas || [], 
    comentarios: (docData.comentarios || []).map((c: any) => ({ 
      ...c, 
      criadoEm: c.criadoEm instanceof Timestamp ? c.criadoEm.toDate() : new Date(c.criadoEm) 
    })), 
    criadoEm: docData.criadoEm instanceof Timestamp ? docData.criadoEm.toDate() : new Date(docData.criadoEm), 

    ocultoNoKanban: docData.ocultoNoKanban ?? false,
  }; 
}; 

export const criarTarefa = async (tarefa: Omit<Tarefa, "id" | "criadoEm">): Promise<string> => { 
  const novaTarefa = { 
    ...tarefa, 
    dataVencimento: tarefa.dataVencimento ? Timestamp.fromDate(tarefa.dataVencimento) : null, 
    criadoEm: Timestamp.now(), 
  }; 
  const docRef = await addDoc(obterColecaoTarefas(), novaTarefa); 
  return docRef.id; 
}; 

export const buscarTarefasDoUsuario = async (usuarioId: string): Promise<Tarefa[]> => { 
  const q = query(obterColecaoTarefas(), where("usuarioId", "==", usuarioId), orderBy("criadoEm", "desc")); 
  const querySnapshot = await getDocs(q); 
  return querySnapshot.docs.map(doc => converterDeFirestore(doc.data(), doc.id)); 
}; 

export const buscarTarefaPorId = async (tarefaId: string): Promise<Tarefa | null> => { 
  const docRef = doc(getFirestoreDb(), "tarefas", tarefaId); 
  const docSnap = await getDoc(docRef); 
  if (docSnap.exists()) { 
    return converterDeFirestore(docSnap.data(), docSnap.id); 
  } 
  return null; 
}; 

export const atualizarTarefa = async (tarefaId: string, dados: Partial<Tarefa>): Promise<void> => { 
  const docRef = doc(getFirestoreDb(), "tarefas", tarefaId); 
  const dadosAtualizacao: any = { ...dados }; 
  if (dados.dataVencimento !== undefined) { 
    dadosAtualizacao.dataVencimento = dados.dataVencimento ? Timestamp.fromDate(dados.dataVencimento) : null; 
  } 
  if (dados.comentarios) { 
    dadosAtualizacao.comentarios = dados.comentarios.map((c: any) => ({ 
      ...c, 
      criadoEm: c.criadoEm instanceof Date ? Timestamp.fromDate(c.criadoEm) : c.criadoEm 
    })); 
  } 
  await updateDoc(docRef, dadosAtualizacao); 
}; 

export const excluirTarefa = async (tarefaId: string): Promise<void> => { 
  const docRef = doc(getFirestoreDb(), "tarefas", tarefaId); 
  await deleteDoc(docRef); 
};