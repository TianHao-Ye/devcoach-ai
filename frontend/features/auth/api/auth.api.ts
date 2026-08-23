import { LoginFormData } from "@/features/auth/schemas/login.schema";
import { api } from "../../../lib/api";
import { RegisterFormData } from "@/features/auth/schemas/register.schema";

// export interface RegisterRequest {
//   email: string;
//   password: string;
//   name?: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

export interface LoginResponse {
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export async function register(
  data: RegisterFormData,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("auth/register", data);
  return response.data;
}

export async function login(data: LoginFormData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("auth/login", data);
  return response.data;
}

export async function getProgile(): Promise<User> {
  const response = await api.get<User>("users/profile");
  return response.data;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await api.post<LogoutResponse>("auth/logout");
  return response.data;
}
