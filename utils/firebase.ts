import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  setPersistence,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  browserSessionPersistence,
} from "firebase/auth";
import { FirebaseOptions } from "firebase/app";

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// TODO if you need SSR auth check this out: https://colinhacks.com/essays/nextjs-firebase-authentication

const app = initializeApp(config, "workouts");

// const database = getDatabase(app);
export const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export { app, googleAuthProvider };

export const authFn = async () => {
  setPersistence(auth, browserSessionPersistence);
  await signInWithRedirect(auth, googleAuthProvider);
};

export const isSignedIn = async () => {
  const result = await getRedirectResult(auth);
  if (result) {
    // This is the signed-in user
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    return true;
  }
  return false;
};
