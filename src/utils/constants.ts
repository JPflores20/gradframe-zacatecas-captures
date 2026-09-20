// Nombres de colecciones en Firebase
export const FIREBASE_COLLECTION_EVENTS = "events";
export const FIREBASE_COLLECTION_REGISTRATIONS = "registrations";

// Claves de Local Storage
export const LOCAL_STORAGE_ADMIN_AUTH_KEY = "gradframe_admin_auth";

// Mensajes de Validación y Errores
export const ERROR_MISSING_FIELDS = "Por favor completa todos los campos requeridos.";
export const ERROR_CREATING_EVENT = "Hubo un error al crear el evento.";
export const ERROR_FETCHING_EVENTS = "Error al cargar los eventos.";
export const ERROR_INVALID_CODE_LENGTH = "El código debe tener exactamente 6 caracteres.";
export const ERROR_CODE_NOT_FOUND = "Código de evento no encontrado o inválido.";
export const ERROR_VERIFYING_CODE = "Hubo un error al verificar el código. Intenta de nuevo.";
export const ERROR_SUBMITTING_REGISTRATION = "Ocurrió un error al registrar tus datos.";
export const ERROR_INVALID_CREDENTIALS = "Credenciales incorrectas.";

// Mensajes de Éxito
export const SUCCESS_EVENT_CREATED = "Evento creado exitosamente.";
export const SUCCESS_CODE_VERIFIED = "Código verificado. Redirigiendo al registro...";
export const SUCCESS_REGISTRATION = "¡Registro completado exitosamente!";
export const SUCCESS_REGISTRATION_DESC = "Tus datos han sido guardados para este evento.";
export const SUCCESS_LOGIN = "Login exitoso.";
export const SUCCESS_LOGOUT = "Sesión cerrada.";


// Constantes misceláneas
export const REQUIRED_CODE_LENGTH = 6;
// Número de WhatsApp actualizado:
export const CONTACT_WHATSAPP_NUMBER = "5215646831101";

// Precios de Sesiones
export const SESSION_PRICES: Record<string, number> = {
  "Sesión completa": 1700,
  "Sesión temática": 1200,
  "Sesión de gala": 1200,
  "Sesión familiar": 1500,
};

// Precios de Cuadros
export const FRAME_PRICES: Record<string, number> = {
  "Sin cuadro": 0,
  "CUADRO GRANDE F1": 2200,
  "CUADRO PEQUEÑO F2": 1400,
  "CUADRO GRANDE MDF": 1700,
  "CUADRO PEQUEÑO MDF": 1100,
  "CUADRO GRANDE MINIMALISTA": 1200,
  "CUADRO PEQUEÑO MINIMALISTA": 900,
};

// Precios Extra
export const PRICE_TOGA_BIRRETE = 150;
export const PRICE_ESTOLA_PERSONALIZADA = 450;
export const PRICE_FOTOS_TITULO = 350;
export const PRICE_FOTOS_IMPRESAS = 320;

export const FOTOS_TITULO_PRICES: Record<string, number> = {
  "No": 0,
  "UAZ": 350,
  "ITZ": 450,
  "Otras universidades": 580,
};

// Opciones de Selección
export const PHOTO_PACKAGE_OPTIONS = Object.keys(SESSION_PRICES);
export const FRAME_STYLE_OPTIONS = Object.keys(FRAME_PRICES);
export const FOTOS_TITULO_OPTIONS = Object.keys(FOTOS_TITULO_PRICES);