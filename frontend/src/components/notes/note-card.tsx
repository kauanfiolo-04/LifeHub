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

      <CardContent className="w-full">
        <div className="h-48">
          <p className="line-clamp-4">
            {note.content}
          </p>
        </div>

        {!!note.tags.length && (
          <div className="flex w-full">
            {note.tags.map((tag, idx, self) => (
              <span key={`${tag}-${idx}`}>
                {idx === (self.length - 1) ? tag : `${tag}, `}
              </span>
            ))}
          </div>
        )}
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