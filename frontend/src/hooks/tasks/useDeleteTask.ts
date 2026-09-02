import { queryKeys } from "@/lib/query-keys";
import { TasksService } from "@/services/tasks.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => TasksService.delete(id),

    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.tasks.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.all,
      });
    }
  });
}