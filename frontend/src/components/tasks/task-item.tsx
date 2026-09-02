import { Task, TaskPriority, TaskStatus } from "@/types/tasks.type";
import { Card, CardContent } from "../ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { getTaskDateLabel } from "@/utils/get-task-date-label";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface TaskItemProps {
  task: Task;
  router: AppRouterInstance;
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

  return (
    <div className="flex gap-2 items-center">
      <HugeiconsIcon size={18} icon={Calendar03Icon} />

      <span className="text-sm">{getTaskDateLabel(date)}</span>
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

      <span className="text-xs">{label}</span>
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

      <span className="text-xs">{label}</span>
    </div>
  );
};

export default function TaskItem({ task, router }: TaskItemProps) {
  return (
    <Card 
      className="w-full min-h-36 cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-500" 
      onClick={() => router.push(`/tasks/${task.id}`)}
    >
      <CardContent className="h-full">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{task.title}</p>

            <Priority priority={task.priority} />
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>

          <div className="flex justify-between items-center">
            <DueDate date={task.dueDate} />

            <Status status={task.status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 