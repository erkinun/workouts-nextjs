import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles.css";
import { AuthUserContext, useFirebaseAuth } from "../utils/authContext";
import { WorkoutProvider } from "../utils/workoutContext";

// TODO consolidate all todos together
// TODO add add/routine page
// TODO use backend id for keys in lists
export default function MyApp({ Component, pageProps }: AppProps) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>
      <WorkoutProvider authUser={auth.authUser}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WorkoutProvider>
    </AuthUserContext.Provider>
  );
}
