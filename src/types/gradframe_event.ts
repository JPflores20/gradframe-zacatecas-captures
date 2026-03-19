export interface EventSession {
  id: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
}

export interface GradframeEvent {
  id?: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  details?: string;
  unique_code: string;
  photographer_id: string;
  created_at?: any;
  deadline?: string;
  sessions?: EventSession[];
}