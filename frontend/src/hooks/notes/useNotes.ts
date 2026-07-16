import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
  return useQuery({
    queryKey: queryKeys.notes,
    queryFn: NotesService.findAll
  });
}