export interface CreateSchedulePayload {
  chat_id: number;
  title: string;
  question: string;
  frequency_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  frequency_value: number;
  repeat_at: string; // Time format "HH:MM:SS"
  repeat_on: string; // Comma-separated days like "monday,wednesday,friday"
  stopping_date: string; // ISO date string
  stopping_threshold: number;
  notify_channels: Array<'in_app' | 'email' | 'sms' | 'slack'>;
}

export interface Schedule {
  id: number;
  chat_id: number;
  title: string;
  question: string;
  frequency_type: string;
  frequency_value: number;
  repeat_at: string;
  repeat_on: string;
  stopping_date: string;
  stopping_threshold: number;
  notify_channels: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScheduleListItem {
  schedule_id: number;
  user_id: number;
  client_id: number;
  chat_id: number;
  title: string;
  question: string;
  frequency_type: string;
  repeat_at: string;
  notify_channels: Array<'in_app' | 'email' | 'sms' | 'slack'>;
  is_active: boolean;
  next_run_at: string;
  last_run_at: string | null;
  run_count: number;
  notification_count: number;
  created_at: string;
  updated_at: string;
}

export interface ScheduleListParams {
  page?: number;
  per_page?: number;
}

export interface ScheduleResult {
  result_id: number;
  schedule_id: number;
  run_at: string;
  status: 'success' | 'failed' | 'pending';
  visualization_type: string;
  report_url: string;
  created_at: string;
}

export interface ScheduleDetail {
  schedule_id: number;
  user_id: number;
  client_id: number;
  chat_id: number;
  title: string;
  question: string;
  frequency_type: string;
  repeat_at: string;
  notify_channels: Array<'in_app' | 'email' | 'sms' | 'slack'>;
  is_active: boolean;
  next_run_at: string;
  last_run_at: string | null;
  run_count: number;
  notification_count: number;
  created_at: string;
  updated_at: string;
  results: ScheduleResult[];
}

export interface UpdateSchedulePayload {
  title: string;
  question: string;
  frequency_type: string;
  frequency_value: number;
  repeat_at: string;
  repeat_on: string;
  stopping_date: string;
  stopping_threshold: number;
  notify_channels: string[];
  is_active: boolean;
}

export interface RunScheduleData {
  schedule_id: number;
  user_id: number;
  client_id: number;
  chat_id: number;
  title: string;
  question: string;
  frequency_type: string;
  frequency_value: number;
  repeat_at: string;
  repeat_on: string;
  stopping_date: string;
  stopping_threshold: number;
  notify_channels: string[];
  is_active: boolean;
  next_run_at: string;
  last_run_at: string;
  run_count: number;
  notification_count: number;
  created_at: string;
  updated_at: string;
}
