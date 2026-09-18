import { queryKeys } from "@/lib/query-keys";
import { AccountsService } from "@/services/finance/accounts.service";
import { useQuery } from "@tanstack/react-query";



export function useAccounts(param ?: { showTransac: boolean }) {
  return useQuery({
    queryKey: queryKeys.finance.accounts.all(param?.showTransac),
    queryFn: () => AccountsService.findAll(param?.showTransac)
  });
}