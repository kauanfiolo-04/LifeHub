import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateNote(){
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: NotesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notes.all
      })
    }
  });
}