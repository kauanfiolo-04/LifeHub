import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => NotesService.delete(id),

    onSuccess: (_, { id }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.notes.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.all,
      });
    }
  });
}