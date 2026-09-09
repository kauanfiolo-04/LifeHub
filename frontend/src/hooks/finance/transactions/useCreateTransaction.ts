import { queryKeys } from "@/lib/query-keys";
import { TransactionsService } from "@/services/finance/transactions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateTransaction(){
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: TransactionsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.finance.transactions.all
      })
    }
  });
}