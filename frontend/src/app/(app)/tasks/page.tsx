"use client";

import NoteSkeleton from "@/components/notes/note-skeleton";
import TaskSearchOrder from "@/components/tasks/task-search-order";
import TasksFilterList from "@/components/tasks/tasks-filter-list";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/tasks/useTasks";
import { useIsMobile } from "@/hooks/use-mobile";
import { Task, TaskSortBy } from "@/types/tasks.type";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TasksPage() {

  const router = useRouter();

  const isMobile = useIsMobile();

  const [tasksToShow, setTasksToShow] = useState<Task[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<TaskSortBy | undefined>();
  const [selectedFilters, setSelectedtFilters] = useState<string[]>([]);

  const { data: tasks, isLoading, refetch } = useTasks({ search, sortBy });


  const handleSearch = ({ search }: { search: string }) => {
    setSearch(search);
  };

  const handleCheckFilter = (value: string) => {
    setSelectedtFilters(
      prev => prev.includes(value) ?
        prev.filter(el => el !== value) : [...prev, value]
    )
  };

  useEffect(() => {
    refetch();
  }, [refetch, search, sortBy]);

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <Button variant="secondary" onClick={() => router.push("/tasks/new")}>
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>

      <div className="flex gap-4 w-full">
        {!isMobile && (
          <div className="w-1/4">
            <TasksFilterList
              checkFilter={handleCheckFilter}
              isMobile={isMobile}
            />
          </div>
        )}

        <div className="w-full">
          <TaskSearchOrder
            onSearch={handleSearch}
            searchValue={search}
            isMobile={isMobile}
            checkFilter={handleCheckFilter}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-4 w-full">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <NoteSkeleton key={index} />
              ))
            ) :
              (tasks ?? []).map(task => (<p key={task.id}>{task.title}</p>))
            }
          </div>
        </div>
      </div>
    </div>
  );
}