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
  user_id: string | number;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  // Add other user fields as needed based on your API response
}
