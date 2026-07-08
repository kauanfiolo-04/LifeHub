import { AuthService } from "@/services/auth.service";
import { ApiError } from "@/types/api.type";
import { RefreshResponse } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useRefreshToken() {
  return useMutation<RefreshResponse, AxiosError<ApiError>>({ mutationFn: AuthService.refresh })
}