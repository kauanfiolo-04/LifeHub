"use client";

import NoteSkeleton from "@/components/notes/note-skeleton";
import NotesList from "@/components/notes/notes-list";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/notes/useNotes";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const { data: notes, isLoading } = useNotes();

  const router = useRouter();
  
  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Notes</h1>

        <Button variant="secondary" onClick={() => router.push("/notes/new")}>
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-items-center mt-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <NoteSkeleton key={index} />
          ))
        ) : (
          <NotesList notes={notes ?? []} />
        )}
      </div>
    </div>
  );
}