import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { UpdateTransactionRequest } from "@/types/finance/transactions.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateTransactionRequest  }) => TransactionsService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.transactions.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.transactions.all,
      });
    }
  });
}