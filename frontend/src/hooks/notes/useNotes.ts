import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { FindAllNoteSearchParam } from "@/types/notes.type";
import { useQuery } from "@tanstack/react-query";

export function useNotes(params: FindAllNoteSearchParam) {
  return useQuery({
    queryKey: queryKeys.notes.all,
    queryFn:() => NotesService.findAll(params)
  });
}