import { queryKeys } from "@/lib/query-keys";
import { AccountsService } from "@/services/finance/accounts.service";
import { UpdateAccountRequest } from "@/types/finance/accounts.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateAccountRequest  }) => AccountsService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.accounts.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.accounts.all,
      });
    }
  });
}