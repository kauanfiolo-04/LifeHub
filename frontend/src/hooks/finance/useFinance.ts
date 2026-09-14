import { queryKeys } from "@/lib/query-keys";
import { FinanceService } from "@/services/finance/finance.service";
import { useQuery } from "@tanstack/react-query";

export function useFinance(accName?: string) {
  return useQuery({
    queryKey: queryKeys.finance.getFinance(accName),
    queryFn: () => FinanceService.finance(accName),
    enabled: !!accName
  });
}