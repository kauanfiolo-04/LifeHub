import { api } from "@/lib/axios";
import { Paginated } from "@/types/api.type";
import { CreateNoteRequest, FindParams, Note, UpdateNoteRequest } from "@/types/notes.type";

export const NotesService = {
  findAll: async ({ search, sortBy, page, limit }: FindParams) => {
    const { data: response } = await api.get<Paginated<Note>>("/notes", {
      params: { search, sortBy, page, limit },
    });

    return response;
  },
  create: async (createNoteDto: CreateNoteRequest) => {
    const { data } = await api.post<Note>("/notes", createNoteDto);

    return data;
  },
  findOne: async (noteId: string) => {
    const { data } = await api.get<Note>(`/notes/${noteId}`);

    return data;
  },
  update: async (noteId: string, updateNoteDTO: UpdateNoteRequest) => {
    const { data } = await api.patch<Note>(`/notes/${noteId}`, updateNoteDTO);

    return data;
  },
  delete: async (noteId: string) => {
    const { data } = await api.delete<Note>(`/notes/${noteId}`);

    return data;
  },
};