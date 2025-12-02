export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface User {
  email: string;
  // Add other user fields as needed
}
