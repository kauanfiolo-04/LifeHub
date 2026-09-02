"use client";

import NoteSkeleton from "@/components/notes/note-skeleton";
import TaskItem from "@/components/tasks/task-item";
import TaskOrder from "@/components/tasks/task-order";
import TaskSearch from "@/components/tasks/task-search";
import TasksFilterList, { getFiltersListGroups } from "@/components/tasks/tasks-filter-list";
import TaskItemSkeleton from "@/components/tasks/tasks-item-skeletor";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useTasks } from "@/hooks/tasks/useTasks";
import { useDebounce } from "@/hooks/useDebounce";
import { useIsMobile } from "@/hooks/useMobile";
import { TaskSortBy, TaskStatus, TaskPriority, Task } from "@/types/tasks.type";
import { matchesDateFilter } from "@/utils/matches-date-filter";
import { FilterMailIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function TasksPage() {

  const router = useRouter();

  const isMobile = useIsMobile();

  const [search, setSearch] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<TaskSortBy | undefined>();
  const [selectedFilters, setSelectedtFilters] = useState<string[]>([]);
  
  const debouncedSearch = useDebounce<string | undefined>(search, 400);
  
  const { data: tasks, refetch, isFetching } = useTasks({ search: debouncedSearch, sortBy });

  const filterTasks = (
    tasks: Task[],
    selectedFilters: string[]
  ) => {
    const groups = getFiltersListGroups(selectedFilters);

    const [statusFilters, priorityFilters, dateFilters] = groups;

    return tasks.filter((task) => {
      const matchesStatus =
        statusFilters.length === 0 ||
        statusFilters.includes(task.status);

      const matchesPriority =
        priorityFilters.length === 0 ||
        priorityFilters.includes(String(task.priority));

      const matchesDate =
        dateFilters.length === 0 ||
        dateFilters.some((filter) =>
          matchesDateFilter(task, filter)
        );

      return matchesStatus && matchesPriority && matchesDate;
    });
  };

  const tasksToShow = useMemo(() => {
    if (!tasks) return [];

    return filterTasks(tasks, selectedFilters)
  }, [tasks, selectedFilters]);

  const handleSearch = ({ search }: { search: string }) => {
    setSearch(search);
  };

  const handleCheckFilter = (value: TaskSortBy | TaskPriority | TaskStatus | string) => {
    const strValue = String(value); // converte pois TaskPriority é number

    setSelectedtFilters(
      prev => prev.includes(strValue) ?
        prev.filter(el => el !== strValue) : [...prev, strValue]
    )
  };

  const clearFilters = () => {
    setSelectedtFilters([]);
  };

  const handleSortBy = (value: TaskSortBy) => {
    setSortBy(value);
  };

  const clearSortBy = () => {
    setSortBy(undefined);
  }

  useEffect(() => {
    refetch();
  }, [refetch, debouncedSearch, sortBy]);

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
          <div className="min-w-60">
            <TasksFilterList
              selectedFilters={selectedFilters}
              checkFilter={handleCheckFilter}
              clearFilters={clearFilters}
              isMobile={isMobile}
            />
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <TaskSearch 
              searchValue={search}
              onSearch={handleSearch}
            />

            <div className="w-full md:w-auto gap-4 flex">
              {isMobile && (
                <Drawer direction="left" fixed >
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="gap-2 w-[calc(50%-8px)]">
                      <span>Filters</span>

                      <HugeiconsIcon icon={FilterMailIcon} />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <TasksFilterList
                      selectedFilters={selectedFilters}
                      checkFilter={handleCheckFilter}
                      clearFilters={clearFilters}
                      isMobile={isMobile}
                    />
                  </DrawerContent>
                </Drawer>
              )}

              <TaskOrder 
                order={sortBy}
                selectOrder={handleSortBy}
                clearOrder={clearSortBy}
                isMobile={isMobile}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 w-full">
            {isFetching ? (
              Array.from({ length: 6 }).map((_, index) => (
                <TaskItemSkeleton key={index} />
              ))
            ) :
              (tasksToShow).map(task => <TaskItem key={task.id} task={task} router={router} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}