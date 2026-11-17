import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { FindParams } from "@/types/tasks.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTasks({ search, sortBy, page, limit }: FindParams = {}) {
  return useQuery({
    queryKey: queryKeys.tasks.list({ search, sortBy, page, limit }),
    queryFn: () => TasksService.findAll({ search, sortBy, page, limit }),
    placeholderData: keepPreviousData
  });
}