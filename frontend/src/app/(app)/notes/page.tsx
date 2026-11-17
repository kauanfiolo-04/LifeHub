"use client";

import ListPagination from "@/components/common/list-pagination";
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

const LIMIT = 10;

const orderOptions: OrderOptions<NoteSortBy>[] = [
  { label: "Created at", value: NoteSortBy.CREATED_AT },
  { label: "Updated at", value: NoteSortBy.UPDATED_AT }
]; 

export default function NotesPage() {
  const router = useRouter();

  const isMobile = useIsMobile();

  const [search, setSearch] = useState<string | undefined>();
  const [orderBy, setOrderBy] = useState<NoteSortBy | undefined>();
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce<string | undefined>(search, 400);

  const { data: response, isLoading, isPlaceholderData } = useNotes({ search: debouncedSearch, orderBy, page, limit: LIMIT });

  const notes = response?.data ?? [];
  const totalPages = Math.max(response?.meta.totalPages ?? 1, 1);

  const handleSearch = ({ search }: { search: string }) => {
    setSearch(search);
    setPage(1);
  };

  const handleOrderBy = (value: NoteSortBy) => {
    setOrderBy(value);
    setPage(1);
  };

  const clearSortBy = () => {
    setOrderBy(undefined);
    setPage(1);
  }

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
              order={orderBy}
              options={orderOptions}
              selectOrder={handleOrderBy}
              clearOrder={clearSortBy}
              isMobile={isMobile}
              type="icon"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-4 w-full">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <NoteSkeleton key={index} />
              ))
            ) :
              notes.map(note => (<NoteCard key={note.id} note={note} />))
            }
          </div>

          {response && response.meta.total > 0 && (
            <ListPagination 
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              disabled={isPlaceholderData}
            />
          )}
        </div>
      </div>
    </>
  );
}