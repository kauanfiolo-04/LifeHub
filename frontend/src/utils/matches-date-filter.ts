import { Task } from "@/types/tasks.type";
import { isThisWeek, isToday, isTomorrow } from "date-fns";

export function matchesDateFilter(task: Task, filter: string) {
  const dueDate = new Date(task.dueDate);

  switch (filter) {
    case 'today':
      return isToday(dueDate);

    case 'tomorrow':
      return isTomorrow(dueDate);

    case 'week':
      return isThisWeek(dueDate);

    default:
      return true;
  }
}
