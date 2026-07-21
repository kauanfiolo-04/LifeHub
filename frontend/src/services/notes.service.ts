import { api } from "@/lib/axios";
import { CreateNoteRequest, Note, UpdateNoteRequest } from "@/types/notes.type";

export const NotesService = {
  findAll: async () => {
    const { data } = await api.get<Note[]>("/notes");

    return data;
  },
  create: async (createNoteDto: CreateNoteRequest) => {
    const { data } = await api.post<Note>("/notes", createNoteDto);

    return data;
  },
  findOne: async (noteId: string) => {
    const { data } = await api.get<Note>(`/notes/${noteId}`);

    return data;
  },
  update: async (id: string, updateNoteDTO: UpdateNoteRequest) => {
    const { data } = await api.patch<Note>(`/notes/${id}`, updateNoteDTO);

    return data;
  }
};