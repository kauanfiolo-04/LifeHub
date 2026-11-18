import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { FindNotesParams } from "@/types/notes.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useNotes(params: FindNotesParams = {}) {
  return useQuery({
    queryKey: queryKeys.notes.list(params),
    queryFn:() => NotesService.findAll(params),
    placeholderData: keepPreviousData
  });
}