import { isToday, isTomorrow } from "date-fns";

export function getTaskDateLabel(date: Date, hours?: boolean) {
  let dateStr;

  dateStr = date.toLocaleDateString();

  if (isToday(date)) dateStr = "Today";
  if (isTomorrow(date)) dateStr = "Tomorrow";

  return `${dateStr}${hours ? ` ${date.getHours()}:${date.getMinutes()}` : ""}`;
}