import { useEffect, useState } from "react";
import { auth } from "./init";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();

export const login = async (navigate) => {
  console.log("wait");
  const userCredentials = await signInWithPopup(auth, googleProvider);

  if (userCredentials.user) navigate("/");

  window.alert(`Zalogowano pomyślnie`);
}


export const logout = () => {
  window.alert(`Wylogowano pomyślnie`);
  console.log('Wylogowano pomyślnie');
  signOut(auth);
}

export const useUser = () => {

  const [user, setUser] = useState(auth?.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(u => setUser(u));
  }, [])

  return user;
}