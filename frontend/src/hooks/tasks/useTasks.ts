import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { FindAllTaskSearchParam } from "@/types/tasks.type";
import { useQuery } from "@tanstack/react-query";

export function useTasks(params: FindAllTaskSearchParam) {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: () => TasksService.findAll(params)
  });
}