import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles.css";
import { AuthUserContext, useFirebaseAuth } from "../utils/authContext";
import { WorkoutProvider } from "../utils/workoutContext";

// TODO consolidate all todos together
// TODO use backend id for keys in lists
// TODO handle the NAV in a better way
// TODO do the mobile styling
// TODO handle root styling with CSS modules or something
// TODO create an src folder and move all the files into it
// TODO eslint + prettier + husky + lint-staged
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
