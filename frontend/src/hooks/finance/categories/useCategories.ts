import { queryKeys } from "@/lib/query-keys";
import { CategoriesService } from "@/services/finance/categories.service";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.finance.categories.all,
    queryFn: CategoriesService.findAll
  });
}