import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { FindTasksParams } from "@/types/tasks.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useTasks(params: FindTasksParams) {
  return useQuery({
    queryKey: queryKeys.tasks.list(params),
    queryFn: () => TasksService.findAll(params),
    placeholderData: keepPreviousData,
  });
}