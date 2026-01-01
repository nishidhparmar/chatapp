export interface CreateReportPayload {
  title: string;
  questions: string[];
  frequency_type: 'daily' | 'weekly' | 'monthly';
  frequency_value: number;
  repeat_at: string; // Time format "HH:MM:SS"
  repeat_on: string; // Comma-separated days like "monday,wednesday,friday"
  stopping_date?: string; // ISO date string
  stopping_threshold: number;
  notify_channels: Array<'in_app' | 'email'>;
  message_id?: number;
}

export interface Report {
  id: number;
  chat_id: number;
  title: string;
  questions: string[];
  frequency_type: string;
  frequency_value: number;
  repeat_at: string;
  repeat_on: string;
  stopping_date?: string;
  stopping_threshold: number;
  notify_channels: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReportListItem {
  report_id: number;
  frequency_value: number;
  user_id: number;
  client_id: number;
  title: string;
  questions: string[];
  frequency_type: string;
  repeat_at: string;
  repeat_on?: string; // Optional field for weekly/monthly schedules
  notify_channels: Array<'in_app' | 'email' | 'sms' | 'slack'>;
  is_active: boolean;
  next_run_at: string;
  last_run_at: string | null;
  stopping_date: string;
  stopping_threshold: number;
  run_count: number;
  notification_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReportListParams {
  page?: number;
  per_page?: number;
}

export interface ReportResult {
  result_id: number;
  report_id: number;
  run_at: string;
  status: 'success' | 'failed' | 'pending';
  visualization_type: string;
  report_url: string | null;
  error_message: string | null;
  created_at: string;
}

export interface ReportDetail {
  report_id: number;
  user_id: number;
  client_id: number;
  title: string;
  questions: string[];
  frequency_type: string;
  frequency_value: number;
  repeat_at: string;
  repeat_on: string | null;
  stopping_date: string;
  stopping_threshold: number | null;
  notify_channels: Array<'in_app' | 'email' | 'sms' | 'slack'>;
  is_active: boolean;
  next_run_at: string;
  last_run_at: string | null;
  run_count: number;
  notification_count: number;
  created_at: string;
  updated_at: string;
  results: ReportResult[];
}

export interface UpdateReportPayload {
  title: string;
  questions: string[];
  frequency_type: string;
  frequency_value: number;
  repeat_at: string;
  repeat_on: string;
  stopping_date: string;
  stopping_threshold: number;
  notify_channels: string[];
  is_active: boolean;
}

export interface RunReportData {
  report_id: number;
  user_id: number;
  client_id: number;
  chat_id: number;
  title: string;
  questions: string[];
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
