import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { auth } from "../utils/firebase";

function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAuthUser(authState);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
}

export default function LoggedIn(props) {
  const { authUser, loading } = useFirebaseAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  if (authUser) {
    return (
      <div className="container">
        <Head>
          <title>Workouts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {props.children}
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
  } else if (!loading) {
    console.log({ typeof: typeof window });
    if (typeof window === "object") {
      // client side
      // Router.push("/");
      return <div>Not Logged in</div>;
    } else {
      return <div>Not Logged in</div>;
    }
  } else {
    // TODO return a component rendering a loading spinner
    return null;
  }
}
