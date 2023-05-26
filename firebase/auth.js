import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as s_out } from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
    setIsLoading(false);
  };

  const signOut = () => {
    s_out(auth).then(() => clear());
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, authStateChanged);
    return () => unSub();
  }, []);
  return {
    authUser,
    isLoading,
    signOut,
    setAuthUser,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
