import { TaskPriority, TaskStatus } from "@/types/tasks.type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface SelectTaskEnumProps<T extends TaskStatus | TaskPriority> {
  value?: T;
  items: typeof TaskStatus | typeof TaskPriority;
  onSelect: (val: T) => void;
  readOnly?: boolean;
}

export default function SelectTaskEnum<T extends TaskStatus | TaskPriority>(
  { value, items, onSelect, readOnly = false }: SelectTaskEnumProps<T>
) {
  const entries = Object.entries(items).filter(
    ([key]) => isNaN(Number(key))
  );

  return (
    <Select
      value={value?.toString()}
      onValueChange={(val) => {
        const item = entries.find(
          ([, value]) => value.toString() === val
        );

        if (item) {
          onSelect(item[1] as T);
        }
      }}
      disabled={readOnly}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>

          {entries.map(([key, val]) => (
            <SelectItem key={key} value={val.toString()}>
              {key
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/^\w/, (c) => c.toUpperCase())}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}