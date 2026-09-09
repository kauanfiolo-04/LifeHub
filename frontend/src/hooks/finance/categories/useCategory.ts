import { queryKeys } from "@/lib/query-keys";
import { CategoriesService } from "@/services/finance/categories.service";
import { useQuery } from "@tanstack/react-query";

export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.finance.categories.detail(id),
    queryFn: () => CategoriesService.findOne(id),
    enabled: !!id
  });
}