import { queryKeys } from "@/lib/query-keys";
import { AccountsService } from "@/services/finance/accounts.service";
import { useQuery } from "@tanstack/react-query";

export function useAccount(id: string) {
  return useQuery({
    queryKey: queryKeys.finance.accounts.detail(id),
    queryFn: () => AccountsService.findOne(id),
    enabled: !!id
  });
}