import { Task } from "@/types/tasks.type";
import { Card, CardContent } from "../ui/card";
import { Field } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { isToday, isTomorrow } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

interface TaskItemProps {
  task: Task;
}

const DueDate = ({ date }: { date: Date | undefined }) => {
  if (!date) return;

  let stringDate = new Date(date).toLocaleDateString();

  if (isToday(date)) stringDate = "Today";

  if (isTomorrow(date)) stringDate = "Tomorrow";

  return (
    <div className="flex gap-2 items-center">
      <HugeiconsIcon icon={Calendar03Icon} />

      <span>{stringDate}</span>
    </div>
  );
};

export default function TaskItem({ task }: TaskItemProps) {

  return (
    <Card>
      <CardContent>
        <Field orientation="horizontal">
          <Checkbox />

          <div>
            <p>{task.title}</p>

            <div>
              <DueDate date={task.dueDate} />
            </div>
          </div>
        </Field>
      </CardContent>
    </Card>
  );
} 