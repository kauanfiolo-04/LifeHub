import { Note } from "@/types/notes.type";
import NoteCard from "./notes-card";
import NoteSkeleton from "./note-skeleton";

interface NotesPropsList {
  notes: Note[];
}

export default function NotesList({ notes }: NotesPropsList) {

  return (
    <>
      {notes.map(note => (<NoteCard key={note.id} note={note}/>))}
      {Array.from({ length: 6 }).map((_, index) => (
        <NoteSkeleton key={index} />
      ))}
    </>
  );
}