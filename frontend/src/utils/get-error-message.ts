import { ApiError } from "@/types/api.type";
import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown) {
  if (isAxiosError<ApiError>(error)) {
    return error.response?.data.message ?? "Unknown error.";
  }

  return "Unexpected error.";
}