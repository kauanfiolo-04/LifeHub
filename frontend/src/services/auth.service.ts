import { api } from "@/lib/axios";
import { LoginRequest, LoginResponse, RefreshResponse, SignUpRequest, SignUpResponse } from "@/types/auth.type";

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials, { skipAuth: true, skipRefresh: true });

    return data;
  },
  signUp: async (userInfo: SignUpRequest): Promise<SignUpResponse> => {
    const { data } = await api.post<SignUpResponse>("/auth/signup", userInfo,  { skipAuth: true, skipRefresh: true });

    return data;
  },
  refresh: async (): Promise<RefreshResponse> => {
    const { data } = await api.post<RefreshResponse>("/auth/refresh", undefined, { skipAuth: true, skipRefresh: true });

    return data;
  },
};
