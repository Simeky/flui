import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const configFirebase = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const temConfiguracaoFirebase = (): boolean => {
  return Boolean(
    configFirebase.apiKey &&
      configFirebase.authDomain &&
      configFirebase.projectId &&
      configFirebase.storageBucket &&
      configFirebase.messagingSenderId &&
      configFirebase.appId,
  );
};

let appInstance: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;

function obterFirebaseApp(): FirebaseApp {
  if (!temConfiguracaoFirebase()) {
    throw new Error(
      "Firebase não está configurado. Verifique as variáveis de ambiente NEXT_PUBLIC_FIREBASE_*.",
    );
  }

  if (!appInstance) {
    appInstance = getApps().length ? getApp() : initializeApp(configFirebase);
  }

  return appInstance;
}

export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    if (typeof window === "undefined") {
      throw new Error("Firebase Auth só pode ser inicializado no cliente.");
    }
    authInstance = getAuth(obterFirebaseApp());
  }

  return authInstance;
}

export function getFirestoreDb(): Firestore {
  if (!dbInstance) {
    if (typeof window === "undefined") {
      throw new Error("Firestore só pode ser inicializado no cliente.");
    }
    dbInstance = getFirestore(obterFirebaseApp());
  }

  return dbInstance;
}
