import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFirebaseAuth } from "../utils/authContext";

export default function LoggedIn(props) {
  const { authUser, loading } = useFirebaseAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  if (authUser) {
    console.log;
    return (
      <div className="container">
        <Head>
          <title>Workouts for {authUser.displayName}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {props.children}
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
  } else if (!loading) {
    router.push("/");
    return <div>Not Logged in</div>;
  } else {
    // TODO return a component rendering a loading spinner
    return null;
  }
}
