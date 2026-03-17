export interface GradframeEvent {
  id?: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  details?: string;
  unique_code: string;
  photographer_id: string;
  created_at?: any;
  deadline?: string; // <-- AÑADE ESTA LÍNEA
}