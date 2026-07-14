import { AuthService } from "@/services/auth.service";
import { ApiError } from "@/types/api.type";
import { LogoutResponse } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useLogout() {
  return useMutation<LogoutResponse, AxiosError<ApiError>>({ mutationFn: AuthService.logout });
}