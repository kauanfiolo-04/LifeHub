import { isToday, isTomorrow } from "date-fns";

export function getTaskDateLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";

  return new Date(date).toLocaleDateString();
}