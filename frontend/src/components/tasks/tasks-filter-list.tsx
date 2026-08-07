import { TaskSortBy, TaskStatus, TaskPriority } from "@/types/tasks.type";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { Field, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";

interface TasksFilterListProps {
  checkFilter: (value: string) => void;
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

export default function TasksFilterList({ checkFilter }: TasksFilterListProps) {
  return (
    <div className="w-full">
      <p className="text-xl">Filters</p>

      {filters.map(filter => (
        <Collapsible key={filter.title}>
          <CollapsibleTrigger className="cursor-pointer flex items-center">
            <span>{filter.title}</span>

            <div
              className="ml-auto transition-transform group-data-[state=open]:rotate-180"
            >
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={14}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {filter.items.map(item => (
              <Field orientation="horizontal" key={item.value}>
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
        </Collapsible>
      ))}
    </div>
  );
}