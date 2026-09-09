import { queryKeys } from "@/lib/query-keys";
import { AccountsService } from "@/services/finance/accounts.service";
import { useQuery } from "@tanstack/react-query";

export function useAccounts() {
  return useQuery({
    queryKey: queryKeys.finance.accounts.all,
    queryFn: AccountsService.findAll
  });
}