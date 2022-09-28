import Head from "next/head";
import LoadingPage from "../components/LoadingPage";

import { googleAuthProvider, app } from "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const auth = getAuth(app);
signInWithPopup(auth, googleAuthProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...

    console.log("are we here?");
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log("error occurred", error);
  });

console.log("foo bar implemented");

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Workouts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Workouts!!</h1>
        <LoadingPage />
      </main>

      {
        // TODO remove this and add your own
      }
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>
    </div>
  );
}
