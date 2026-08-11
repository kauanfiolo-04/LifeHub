import { TaskSortBy, TaskStatus, TaskPriority } from "@/types/tasks.type";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { Field, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent, CardHeader } from "../ui/card";
import { DrawerClose } from "../ui/drawer";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface TasksFilterListProps {
  checkFilter: (value: string) => void;
  isMobile: boolean;
}

export type TaskFilter = {
  title: string;
  items: Array<{
    label: string,
    value: TaskSortBy | TaskPriority | TaskStatus | string;
  }>;
};

const filters: TaskFilter[] = [
  {
    title: "Status",
    items: [
      {
        label: "Pending",
        value: TaskStatus.PENDING
      },
      {
        label: "In progress",
        value: TaskStatus.IN_PROGRESS
      },
      {
        label: "Completed",
        value: TaskStatus.COMPLETED
      },
      {
        label: "Cancelled",
        value: TaskStatus.CANCELLED
      }
    ]
  },
  {
    title: "Priority",
    items: [
      {
        label: "Low",
        value: TaskPriority.LOW
      },
      {
        label: "Medium",
        value: TaskPriority.MEDIUM
      },
      {
        label: "High",
        value: TaskPriority.HIGH
      }
    ]
  },
  {
    title: "Date",
    items: [
      {
        label: "Today",
        value: "today"
      },
      {
        label: "Tomorrow",
        value: "tomorrow"
      },
      {
        label: "This week",
        value: "week"
      },
    ]
  }
];

export default function TasksFilterList({ checkFilter, isMobile }: TasksFilterListProps) {
  return (
    <Card className="ring-0 md:ring-1">
      <CardHeader className="flex justify-between items-center">
        <p className="text-xl font-semibold">Filters</p>

        {isMobile && (
          <DrawerClose asChild>
            <Button variant="ghost">
              <HugeiconsIcon icon={CancelCircleIcon} size={14} />
            </Button>
          </DrawerClose>
        )}
      </CardHeader>

      <CardContent>
        {filters.map((filter, idx) => (
          <Collapsible defaultOpen key={filter.title}>
            <CollapsibleTrigger className="w-full cursor-pointer flex items-center justify-between group gap-2 h-7">
              <span className="text-sm font-semibold">{filter.title}</span>

              <div
                className="ml-auto transition-transform group-data-[state=open]:rotate-180"
              >
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={14}
                />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="my-2">
              {filter.items.map((item) => (
                <Field orientation="horizontal" key={item.value} className="my-1.5">
                  <Checkbox 
                    id={item.value}
                    onCheckedChange={() => checkFilter(item.value)}
                  />

                  <FieldLabel htmlFor={item.value}>
                    {item.label}
                  </FieldLabel>
                </Field>
              ))}
            </CollapsibleContent>

            {idx !== filters.length - 1 && <Separator />}
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}