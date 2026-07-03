import { AuthService } from '@/services/auth.service';
import { ApiError } from '@/types/api.type';
import { LoginRequest, LoginResponse } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useLogin() {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({ mutationFn: AuthService.login });
}
