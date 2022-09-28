import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

// TODO move the auth information to session so we can use it on the server
// TODO setup prettier, eslint and husky
export function useFirebaseAuth() {
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

export const AuthUserContext = createContext({
  authUser: null,
  loading: true,
});

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);
