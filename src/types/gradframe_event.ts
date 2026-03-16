export interface GradframeEvent {
  id?: string;
  title: string;
  date: string;
  time: string;
  location?: string; // <-- Agregamos esta línea
  unique_code: string;
  created_at: number;
  photographer_id: string;
  details?: string;
}