import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { useQuery } from "@tanstack/react-query";

export function useTransactions() {
  return useQuery({
    queryKey: queryKeys.finance.transactions.all,
    queryFn: TransactionsService.findAll
  });
}