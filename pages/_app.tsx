import type { AppProps } from "next/app";
import "../styles.css";
import { AuthUserContext, useFirebaseAuth } from "../utils/authContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>
      <Component {...pageProps} />;
    </AuthUserContext.Provider>
  );
}
