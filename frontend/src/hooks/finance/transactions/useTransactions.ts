import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { FindParams } from "@/types/finance/transactions.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTransactions(
  { accountName, search, page = 1, limit = 20 }: FindParams = {}
) {
  return useQuery({
    queryKey: queryKeys.finance.transactions.list({ accountName, search, page, limit }),
    queryFn: () => TransactionsService.findAll({ accountName, search, page, limit }),
    placeholderData: keepPreviousData
  });
}