import { Note } from "@/types/notes.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getAccessibleTextColor } from "@/utils/get-acessible-text-color";
import { useRouter } from "next/navigation";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();

  return (
    <Card 
      className="w-full h-52 md:h-96 aspect-3/4 cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-500"
      style={{ backgroundColor: note.color, color: note.color ? getAccessibleTextColor(note.color) : undefined  }}
      onClick={() => router.push(`/notes/${note.id}`)}
    >
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>

      <CardContent className="w-full h-48">
        <p className="line-clamp-4">
          {note.content}
        </p>
      </CardContent>

      <CardFooter className="mt-auto">
        {note.updatedAt && (
          <CardDescription className="ml-auto">
            <p 
              className="text-xs" 
              style={{ color: note.color ? getAccessibleTextColor(note.color) : undefined }}
            >
                {new Date(note.updatedAt!).toLocaleDateString() ?? ""}
            </p>
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  );
}