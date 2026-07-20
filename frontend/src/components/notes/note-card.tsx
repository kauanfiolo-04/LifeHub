import { Note } from "@/types/notes.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getAccessibleTextColor } from "@/utils/get-acessible-text-color";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="w-full h-52 md:h-96 aspect-3/4"
      style={{ backgroundColor: note.color, color: note.color ? getAccessibleTextColor(note.color) : undefined  }}
    >
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>

      <CardContent className="w-full h-48">
        {note.content}
      </CardContent>

      <CardFooter className="mt-auto">
        {note.updatedAt && (
          <CardDescription className="ml-auto">
            <p className="text-xs">{new Date(note.updatedAt!).toLocaleDateString() ?? ""}</p>
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  );
}