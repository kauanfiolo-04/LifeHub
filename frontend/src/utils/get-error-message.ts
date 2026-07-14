import { ApiError } from "@/types/api.type";
import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string | string[] {
  if (isAxiosError<ApiError>(error)) {
    const message = error.response?.data.message;

    if (!message) return "Unknown error."

    if (Array.isArray(message)) return message as string[];

    return message;
  }

  return "Unexpected error.";
}