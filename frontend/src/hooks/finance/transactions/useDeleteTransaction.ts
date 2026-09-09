import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => TransactionsService.delete(id),

    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.finance.transactions.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.transactions.all,
      });
    }
  });
}