import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { useQuery } from "@tanstack/react-query";

export function useTransaction(id: string) {
  return useQuery({
    queryKey: queryKeys.finance.transactions.detail(id),
    queryFn: () => TransactionsService.findOne(id),
    enabled: !!id
  });
}