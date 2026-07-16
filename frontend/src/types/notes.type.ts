export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateNoteRequest = {
  title: string;
  content: string;
  tags?: string[];
};

export type UpdateNoteRequest = Partial<CreateNoteRequest>;

export type DeleteNoteRequest = {
  noteId: string;
}