import { LOCAL_STORAGE_ADMIN_AUTH_KEY, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD } from "@/utils/constants";

export const login_admin = async (email_input: string, password_input: string): Promise<boolean> => {
  // Simulación de validación en servidor
  return new Promise((resolve) => {
    setTimeout(() => {
      const is_valid = email_input === TEST_ADMIN_EMAIL && password_input === TEST_ADMIN_PASSWORD;
      
      if (is_valid) {
        localStorage.setItem(LOCAL_STORAGE_ADMIN_AUTH_KEY, "true");
      }
      
      resolve(is_valid);
    }, 800);
  });
};

export const logout_admin = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_ADMIN_AUTH_KEY);
};

export const check_is_admin_authenticated = (): boolean => {
  const auth_status = localStorage.getItem(LOCAL_STORAGE_ADMIN_AUTH_KEY);
  if (auth_status === "true") {
    return true;
  }
  return false;
};
