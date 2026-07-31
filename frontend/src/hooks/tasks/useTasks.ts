import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: TasksService.findAll
  });
}