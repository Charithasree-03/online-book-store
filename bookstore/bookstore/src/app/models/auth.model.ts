export type Role = 'USER' | 'ADMIN';

export interface SignInRequest { email: string; password: string; }

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface JwtAuthenticationResponse {
  token: string;
  role?: string;
  name?: string;
  email?: string;
}

