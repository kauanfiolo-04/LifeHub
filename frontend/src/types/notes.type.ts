export enum NoteSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FindAllNoteSearchParam = {
  search?: string;
  sortBy?: NoteSortBy;
}

export type CreateNoteRequest = {
  title: string;
  content: string;
  tags?: string[];
  color?: string;
};

export type UpdateNoteRequest = Partial<CreateNoteRequest>;

export type DeleteNoteRequest = {
  noteId: string;
}