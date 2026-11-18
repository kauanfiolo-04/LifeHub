import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { FindTransactionsParams } from "@/types/finance/transactions.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTransactions(
  { page = 1, limit = 20, ...rest }: FindTransactionsParams = {}
) {
  return useQuery({
    queryKey: queryKeys.finance.transactions.list({ ...rest, page, limit }),
    queryFn: () => TransactionsService.findAll({ ...rest, page, limit }),
    placeholderData: keepPreviousData
  });
}