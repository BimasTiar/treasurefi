import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseClient";

export async function loginUser(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();

  return {
    user: result.user,
    token
  };
}