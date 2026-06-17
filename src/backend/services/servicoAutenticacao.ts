import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuth } from "@/backend/lib/firebase";
import type { Usuario } from "@/backend/types/usuario";
import {
  NOME_COOKIE_SESSAO,
  DURACAO_COOKIE_SEGUNDOS,
} from "@/backend/constants/autenticacao";

function obterAuth() {
  return getFirebaseAuth();
}

function usaProvedorEmail(usuario: User): boolean {
  return usuario.providerData.some(
    (provedor) => provedor.providerId === "password",
  );
}

function emailEstaVerificado(usuario: User): boolean {
  if (usuario.emailVerified) return true;

  const provedoresOAuth = ["google.com", "github.com"];

  return usuario.providerData.some((provedor) =>
    provedoresOAuth.includes(provedor.providerId),
  );
}

export function mapearUsuarioFirebase(usuarioFirebase: User): Usuario {
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName ?? "",
    email: usuarioFirebase.email ?? "",
    emailVerificado: emailEstaVerificado(usuarioFirebase),
    fotoUrl: usuarioFirebase.photoURL ?? undefined,
  };
}

async function definirCookieSessao(usuario: User): Promise<void> {
  const token = await usuario.getIdToken();
  document.cookie = `${NOME_COOKIE_SESSAO}=${token}; path=/; max-age=${DURACAO_COOKIE_SEGUNDOS}; SameSite=Lax`;
}

export function limparCookieSessao(): void {
  document.cookie = `${NOME_COOKIE_SESSAO}=; path=/; max-age=0; SameSite=Lax`;
}

async function bloquearSeEmailNaoVerificado(usuario: User): Promise<void> {
  if (!usaProvedorEmail(usuario) || usuario.emailVerified) return;

  await signOut(obterAuth());
  limparCookieSessao();

  throw new FirebaseError(
    "auth/email-not-verified",
    "Verifique seu e-mail antes de entrar.",
  );
}

export async function entrarComEmail(
  email: string,
  senha: string,
): Promise<Usuario> {
  const credencial = await signInWithEmailAndPassword(obterAuth(), email, senha);
  await bloquearSeEmailNaoVerificado(credencial.user);
  await definirCookieSessao(credencial.user);
  return mapearUsuarioFirebase(credencial.user);
}

export async function cadastrarComEmail(
  nome: string,
  email: string,
  senha: string,
): Promise<void> {
  const credencial = await createUserWithEmailAndPassword(obterAuth(), email, senha);
  await updateProfile(credencial.user, { displayName: nome });
  await sendEmailVerification(credencial.user);
  await signOut(obterAuth());
  limparCookieSessao();
}

export async function entrarComGoogle(): Promise<Usuario> {
  const provedor = new GoogleAuthProvider();
  const credencial = await signInWithPopup(obterAuth(), provedor);
  await definirCookieSessao(credencial.user);
  return mapearUsuarioFirebase(credencial.user);
}

export async function entrarComGithub(): Promise<Usuario> {
  const provedor = new GithubAuthProvider();
  const credencial = await signInWithPopup(obterAuth(), provedor);
  await definirCookieSessao(credencial.user);
  return mapearUsuarioFirebase(credencial.user);
}

export async function sair(): Promise<void> {
  await signOut(obterAuth());
  limparCookieSessao();
}

export type ProvedorReautenticacao = "email" | "google" | "github";

export function obterProvedorPrincipal(): ProvedorReautenticacao {
  const usuario = obterAuth().currentUser;
  if (!usuario) return "email";

  const provedores = usuario.providerData.map((p) => p.providerId);

  if (provedores.includes("google.com")) return "google";
  if (provedores.includes("github.com")) return "github";
  return "email";
}

async function reautenticarUsuario(
  senha?: string,
  provedor?: ProvedorReautenticacao,
): Promise<void> {
  const auth = obterAuth();
  const usuario = auth.currentUser;
  if (!usuario) {
    throw new Error("Nenhum usuário autenticado.");
  }

  const provedorAtual = provedor ?? obterProvedorPrincipal();

  if (provedorAtual === "email") {
    if (!senha || !usuario.email) {
      throw new Error("Senha necessária para confirmar a exclusão.");
    }

    const credencial = EmailAuthProvider.credential(usuario.email, senha);
    await reauthenticateWithCredential(usuario, credencial);
    return;
  }

  if (provedorAtual === "google") {
    await reauthenticateWithPopup(usuario, new GoogleAuthProvider());
    return;
  }

  await reauthenticateWithPopup(usuario, new GithubAuthProvider());
}

export async function excluirConta(senha?: string): Promise<void> {
  const auth = obterAuth();
  const usuario = auth.currentUser;
  if (!usuario) {
    throw new Error("Nenhum usuário autenticado.");
  }

  try {
    await deleteUser(usuario);
  } catch (erro) {
    if (
      erro instanceof FirebaseError &&
      erro.code === "auth/requires-recent-login"
    ) {
      await reautenticarUsuario(senha);

      if (!auth.currentUser) {
        throw new Error("Falha ao reautenticar o usuário.");
      }

      await deleteUser(auth.currentUser);
    } else {
      throw erro;
    }
  }

  limparCookieSessao();
}

export function observarAutenticacao(
  callback: (usuario: Usuario | null) => void,
): () => void {
  return onAuthStateChanged(obterAuth(), async (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (usaProvedorEmail(usuarioFirebase) && !usuarioFirebase.emailVerified) {
        await signOut(obterAuth());
        limparCookieSessao();
        callback(null);
        return;
      }

      await definirCookieSessao(usuarioFirebase);
      callback(mapearUsuarioFirebase(usuarioFirebase));
    } else {
      limparCookieSessao();
      callback(null);
    }
  });
}

export function traduzirErroFirebase(codigo: string): string {
  const mensagens: Record<string, string> = {
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/email-already-in-use": "Este e-mail já está em uso.",
    "auth/weak-password": "A senha é muito fraca.",
    "auth/invalid-credential": "Credenciais inválidas.",
    "auth/popup-closed-by-user": "Login cancelado.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    "auth/requires-recent-login":
      "Por segurança, confirme sua identidade para continuar.",
    "auth/email-not-verified":
      "Verifique seu e-mail antes de entrar. Confira sua caixa de entrada.",
  };

  return mensagens[codigo] ?? "Ocorreu um erro. Tente novamente.";
}
