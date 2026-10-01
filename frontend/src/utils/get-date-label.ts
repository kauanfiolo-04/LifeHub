import { isToday, isTomorrow } from "date-fns";

export function getDateLabel(date: Date, hours?: boolean) {
  let dateStr;

  dateStr = date.toLocaleDateString();

  if (isToday(date)) dateStr = "Today";
  if (isTomorrow(date)) dateStr = "Tomorrow";

  return `${dateStr}${hours ? ` ${
    String(date.getHours()).padStart(2, "0")
  }:${
    String(date.getMinutes()).padStart(2, "0")
  }` : ""}`;
}