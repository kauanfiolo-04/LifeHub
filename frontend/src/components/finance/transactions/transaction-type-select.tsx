import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionType } from "@/types/finance/transactions.type";

interface TransactionTypeSelectProps {
  value: TransactionType;
  setValue: (val: TransactionType) => void;
}

export default function TransactionTypeSelect({ value, setValue }: TransactionTypeSelectProps) {
  const entries = Object.entries(TransactionType);

  return (
    <Select 
      value={value}
      onValueChange={setValue}
    >
      <SelectTrigger className="w-full">
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