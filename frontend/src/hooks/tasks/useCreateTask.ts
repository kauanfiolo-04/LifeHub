import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.all
      });
    }
  });
}