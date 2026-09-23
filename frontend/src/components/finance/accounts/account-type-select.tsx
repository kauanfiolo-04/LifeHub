import { AccountType } from "@/types/finance/accounts.type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select";

interface AccountTypeSelectProps {
  value: AccountType;
  setValue: (val: AccountType) => void;
}

export default function AccountTypeSelect({ value, setValue }: AccountTypeSelectProps) {
  const entries = Object.entries(AccountType);

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