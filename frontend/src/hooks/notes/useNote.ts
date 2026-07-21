import { queryKeys } from "@/lib/query-keys";
import { NotesService } from "@/services/notes.service";
import { useQuery } from "@tanstack/react-query";

export function useNote(id: string) {
  return useQuery({
    queryKey: queryKeys.notes.detail(id),
    queryFn: () => NotesService.findOne(id),
    enabled: !!id
  });
}