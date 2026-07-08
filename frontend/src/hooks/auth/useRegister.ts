import { AuthService } from "@/services/auth.service";
import { ApiError } from "@/types/api.type";
import { SignUpRequest, SignUpResponse } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useRegister() {
  return useMutation<SignUpResponse, AxiosError<ApiError>, SignUpRequest>({
    mutationFn: AuthService.signUp
  });
}