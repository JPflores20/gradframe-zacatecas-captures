import { LOCAL_STORAGE_ADMIN_AUTH_KEY } from "@/utils/constants";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login_admin = async (email_input: string, password_input: string): Promise<boolean> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email_input, password_input);
    if (userCredential.user) {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_AUTH_KEY, "true");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during Firebase login:", error);
    return false;
  }
};

export const logout_admin = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during Firebase logout:", error);
  }
  // We keep this sync operation to not break the synchronous routers checking localStorage
  localStorage.removeItem(LOCAL_STORAGE_ADMIN_AUTH_KEY);
};

export const check_is_admin_authenticated = (): boolean => {
  const auth_status = localStorage.getItem(LOCAL_STORAGE_ADMIN_AUTH_KEY);
  if (auth_status === "true") {
    return true;
  }
  return false;
};
