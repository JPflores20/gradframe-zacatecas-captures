export interface GradframeRegistration {
  id?: string;
  event_id: string;
  user_id: string;
  name: string;
  phone_number: string;
  height: string;
  photo_package: string;
  stole_and_cap: boolean;
  custom_stole: string;
  fotos_titulo?: string | boolean;
  printed_photos?: boolean;
  frame_style: string;
  total_cost?: number;
  anticipo?: number;
  created_at: number;
}
