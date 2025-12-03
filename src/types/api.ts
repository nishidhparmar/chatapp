export interface ApiResponse<T = unknown> {
  status: string;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  status: string;
  message: string;
  error?: unknown;
}
