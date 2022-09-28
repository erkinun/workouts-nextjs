import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
import { FirebaseOptions } from "firebase/app";

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

/* const config = {
  apiKey: "AIzaSyAsioVmJQGli4eiQbyN155uj6rcbuSpJu0",
  authDomain: "workouts-logging.firebaseapp.com",
  databaseURL: "https://workouts-logging.firebaseio.com",
  projectId: "workouts-logging",
  storageBucket: "workouts-logging.appspot.com",
  messagingSenderId: "178785944491",
}; */

console.log({ config });
console.log("initializing firebase");
const app = initializeApp(config, "workouts");

// const database = getDatabase(app);

const googleAuthProvider = new GoogleAuthProvider();

export { app, googleAuthProvider };
