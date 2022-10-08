import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles.css";
import { AuthUserContext, useFirebaseAuth } from "../utils/authContext";

// TODO consolidate all todos together
// TODO add add/routine page
// TODO use backend id for keys in lists
export default function MyApp({ Component, pageProps }: AppProps) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthUserContext.Provider>
  );
}
