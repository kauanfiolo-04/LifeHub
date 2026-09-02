import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { useQuery } from "@tanstack/react-query";

export function useTask(id: string) {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: () => TasksService.findOne(id),
    enabled: !!id
  });
}