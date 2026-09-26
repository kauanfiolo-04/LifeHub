import { Account } from "@/types/finance/accounts.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dispatch, SetStateAction } from "react";
import { formatToLabel } from "@/utils/format-to-label";
import AccountIcon from "./AccountIcon";

interface AccountSelectProps {
  value: Account | undefined;
  accounts: Account[];
  setValue: (val: Account) => void;
  type: "all" | "select";
}

export default function AccountSelect({ value, accounts, setValue, type = "select" }: AccountSelectProps) {
  return (
    <Select
      defaultValue={type}
      onValueChange={str => {
        const acc = accounts.find(item => item.name.toLowerCase() === str);

        if (acc) setValue(acc);
      }}
    >
      <SelectTrigger className="w-[calc(50%-8px)] md:w-40">
        <div>
          <SelectValue>
            <p className="text-sm">
              {((val) => {
                if (!val) return val === "all" ? "All accounts" : "Select an account";

                return formatToLabel(val.name);
              })(value)}
            </p>
          </SelectValue>
        </div>
      </SelectTrigger>

      <SelectContent>
        {type === "all" && (
          <SelectItem value="all">
            <p className="text-sm">All accounts</p>
          </SelectItem>
        )}
        {accounts.map(acc => (
          <SelectItem
            key={acc.id}
            value={acc.name.toLowerCase()}
          >
            <div>
              <p className="text-sm">{acc.name}</p>
              <div className="flex items-center gap-2">
                <AccountIcon accType={acc.type}/>
                <span className="text-xs text-gray-400">{formatToLabel(acc.type)}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}