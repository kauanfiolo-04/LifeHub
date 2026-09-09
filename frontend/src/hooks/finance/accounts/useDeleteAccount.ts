import { queryKeys } from "@/lib/query-keys";
import { AccountsService } from "@/services/finance/accounts.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => AccountsService.delete(id),

    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.finance.accounts.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.accounts.all,
      });
    }
  });
}