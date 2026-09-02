import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { UpdateTaskRequest } from "@/types/tasks.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateTaskRequest  }) => TasksService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.all,
      });
    }
  });
}