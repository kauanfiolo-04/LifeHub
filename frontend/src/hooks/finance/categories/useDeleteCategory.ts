import { queryKeys } from "@/lib/query-keys";
import { CategoriesService } from "@/services/finance/categories.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => CategoriesService.delete(id),

    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.finance.categories.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.categories.all,
      });
    }
  });
}