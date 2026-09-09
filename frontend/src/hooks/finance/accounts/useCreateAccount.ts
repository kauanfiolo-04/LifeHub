import { queryKeys } from "@/lib/query-keys";
import { AccountsService } from "@/services/finance/accounts.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateAccount(){
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: AccountsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.finance.accounts.all
      })
    }
  });
}