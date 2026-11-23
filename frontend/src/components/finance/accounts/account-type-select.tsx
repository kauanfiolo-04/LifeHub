import { AccountType } from "@/types/finance/accounts.type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select";

interface AccountTypeSelectProps {
  value: AccountType;
  setValue: (val: AccountType) => void;
  disabled?: boolean;
}

export default function AccountTypeSelect({ value, setValue, disabled }: AccountTypeSelectProps) {
  const entries = Object.entries(AccountType);

  return (
    <Select 
      value={value}
      onValueChange={setValue}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select account type</SelectLabel>

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