import { queryKeys } from "@/lib/query-keys";
import { CategoriesService } from "@/services/finance/categories.service";
import { UpdateCategoryRequest } from "@/types/finance/categories.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateCategoryRequest  }) => CategoriesService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.categories.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.finance.categories.all,
      });
    }
  });
}