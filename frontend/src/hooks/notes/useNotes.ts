import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { FindParams } from "@/types/notes.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useNotes({ search, orderBy, page, limit }: FindParams = {}) {
  return useQuery({
    queryKey: queryKeys.notes.list({ search, orderBy, page, limit }),
    queryFn:() => NotesService.findAll({ search, orderBy, page, limit }),
    placeholderData: keepPreviousData
  });
}