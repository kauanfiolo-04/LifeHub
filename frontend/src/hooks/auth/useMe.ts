import { queryKeys } from "@/lib/query-keys";
import { AuthService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: AuthService.me,
    staleTime: 1000 * 60 * 10
  });
}