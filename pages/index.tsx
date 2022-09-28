import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import { authFn, isSignedIn } from "../utils/firebase";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    isSignedIn().then((res) => {
      if (res) {
        setLoggedIn(true);
      } else {
        authFn();
      }
    });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Router.push("/dashboard");
    }
  }, [loggedIn]);
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
