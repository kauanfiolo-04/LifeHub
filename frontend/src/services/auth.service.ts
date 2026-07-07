import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from "@/types/auth.type";

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials, { skipAuth: true, skipRefresh: true });

    return data;
  },
  signUp: async (userInfo: SignUpRequest): Promise<SignUpResponse> => {
    const { data } = await api.post<SignUpResponse>("/auth/signup", userInfo,  { skipAuth: true, skipRefresh: true });

    return data;
  }
}