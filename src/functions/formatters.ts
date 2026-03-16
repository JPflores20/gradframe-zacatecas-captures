// Función para generar un código alfanumérico único de n caracteres
export const generate_unique_code = (length: number): string => {
  const random_string = Math.random().toString(36).substring(2, 2 + length);
  return random_string.toUpperCase();
};
