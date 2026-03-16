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

// Credenciales
export const TEST_ADMIN_EMAIL = "admin@gradframe.mx";
export const TEST_ADMIN_PASSWORD = "admin";

// Constantes misceláneas
export const REQUIRED_CODE_LENGTH = 6;
export const CONTACT_WHATSAPP_NUMBER = "524921234567"; // Número de WhatsApp para reservaciones (Modificar si es necesario)
