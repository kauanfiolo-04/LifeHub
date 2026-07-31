import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface SelectTaskEnumProps<T> {
  value?: T;
  items: Record<string, T>;
  onSelect: (val: T) => void;
}

export default function SelectTaskEnum<T extends string>({ value, items, onSelect }: SelectTaskEnumProps<T>) {
  return (
    <Select value={value} onValueChange={(val) => onSelect(val as T)}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>

          {Object.entries(items).map(([key, val]) => (
            <SelectItem key={key} value={val}>
              {key
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/^\w/, (c) => c.toUpperCase())
              }
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}