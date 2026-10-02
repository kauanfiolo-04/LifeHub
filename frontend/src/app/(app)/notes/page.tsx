"use client";

import OrderBy, { OrderOptions } from "@/components/common/order-by";
import Search from "@/components/common/search";
import NoteCard from "@/components/notes/note-card";
import NoteSkeleton from "@/components/notes/note-skeleton";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/notes/useNotes";
import { useDebounce } from "@/hooks/useDebounce";
import { useIsMobile } from "@/hooks/useMobile";
import { NoteSortBy } from "@/types/notes.type";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const orderOptions: OrderOptions<NoteSortBy>[] = [
  { label: "Created at", value: NoteSortBy.CREATED_AT },
  { label: "Updated at", value: NoteSortBy.UPDATED_AT }
]; 

export default function NotesPage() {
  const router = useRouter();

  const isMobile = useIsMobile();

  const [search, setSearch] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<NoteSortBy | undefined>();

  const debouncedSearch = useDebounce<string | undefined>(search, 400);

  const { data: notes, isLoading, refetch } = useNotes({ search: debouncedSearch, sortBy });

  const handleSearch = ({ search }: { search: string }) =>
    setSearch(search);

  const handleSortBy = (value: NoteSortBy) =>
    setSortBy(value);

  const clearSortBy = () =>
    setSortBy(undefined);

  useEffect(() => {
    refetch();
  }, [refetch, debouncedSearch, sortBy]);

  return (
    <>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Notes</h1>

        <Button variant="secondary" onClick={() => router.push("/notes/new")}>
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>

      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <Search
              searchValue={search}
              onSearch={handleSearch}
            />
            
            <OrderBy<NoteSortBy>
              order={sortBy}
              options={orderOptions}
              selectOrder={handleSortBy}
              clearOrder={clearSortBy}
              isMobile={isMobile}
              type="icon"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-4 w-full">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <NoteSkeleton key={index} />
              ))
            ) :
              (notes ?? []).map(note => (<NoteCard key={note.id} note={note} />))
            }
          </div>
        </div>
      </div>
    </>
  );
}