import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { FindParams } from "@/types/notes.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useNotes({ search, sortBy, page, limit }: FindParams = {}) {
  return useQuery({
    queryKey: queryKeys.notes.list({ search, sortBy, page, limit }),
    queryFn:() => NotesService.findAll({ search, sortBy, page, limit }),
    placeholderData: keepPreviousData
  });
}