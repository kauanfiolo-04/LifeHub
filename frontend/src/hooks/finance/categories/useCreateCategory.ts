import { queryKeys } from "@/lib/query-keys";
import { CategoriesService } from "@/services/finance/categories.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCategory(){
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: CategoriesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.finance.categories.all
      })
    }
  });
}