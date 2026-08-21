import { Task, TaskPriority, TaskStatus } from "@/types/tasks.type";
import { Card, CardContent } from "../ui/card";
import { Field } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { isToday, isTomorrow } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

interface TaskItemProps {
  task: Task;
}

interface DueDateProps { 
  date: Date | undefined;
}

interface PriorityProps {
  priority: TaskPriority;
}

interface StatusProps {
  status: TaskStatus;
}

const DueDate = ({ date }: DueDateProps) => {
  if (!date) return;

  let stringDate = new Date(date).toLocaleDateString();

  if (isToday(date)) stringDate = "Today";

  if (isTomorrow(date)) stringDate = "Tomorrow";

  return (
    <div className="flex gap-2 items-center">
      <HugeiconsIcon size={18} icon={Calendar03Icon} />

      <span>{stringDate}</span>
    </div>
  );
};

const Priority = ({ priority }: PriorityProps) => {
  let color: string | undefined;
  let label= "";

  switch(priority) {
    case TaskPriority.HIGH:
      color = "red";
      label = "High"
      break;
    
    case TaskPriority.MEDIUM: 
      color = "yellow";
      label = "Medium"
      break;

    case TaskPriority.LOW:
      color = "green";
      label = "Low"
      break;
  }

  return (
    <div className="flex items-center gap-1">
      <div className="rounded-full w-2 h-2" style={{ backgroundColor: color }} />

      <span>{label}</span>
    </div>
  );
};

const Status = ({ status }: StatusProps) => {
  let color: string | undefined;
  let label= "";

  switch(status) {
    case TaskStatus.PENDING:
      color = "red";
      label = "Pending"
      break;
    
    case TaskStatus.IN_PROGRESS: 
      color = "yellow";
      label = "In progress"
      break;

    case TaskStatus.CANCELLED: 
      color = "orange";
      label = "Cancelled"
      break;

    case TaskStatus.COMPLETED:
      color = "green";
      label = "Completed"
      break;
  }

  return (
    <div className="flex items-center gap-1">
      <div className="rounded-full w-2 h-2" style={{ backgroundColor: color }} />

      <span>{label}</span>
    </div>
  );
};

export default function TaskItem({ task }: TaskItemProps) {

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex gap-4 items-center">
          <Checkbox />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold">{task.title}</p>

              <Priority priority={task.priority} />
            </div>

            <p className="text-xs text-gray-600 line-clamp-3">{task.description}</p>

            <div className="flex justify-between items-center">
              <DueDate date={task.dueDate} />

              <Status status={task.status} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 