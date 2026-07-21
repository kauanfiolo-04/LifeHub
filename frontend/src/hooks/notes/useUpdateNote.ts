import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { UpdateNoteRequest } from "@/types/notes.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateNoteRequest  }) => NotesService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notes.all,
      });
    }
  });
}