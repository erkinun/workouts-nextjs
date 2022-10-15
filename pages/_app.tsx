import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles.css";
import { AuthUserContext, useFirebaseAuth } from "../utils/authContext";
import { WorkoutProvider } from "../utils/workoutContext";

// TODO edit routine, delete routine, use routine in a workout, save workout as routine are left
// TODO consolidate all todos together
// TODO add add/routine page
// TODO add edit routine and workout page
// TODO use backend id for keys in lists
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
