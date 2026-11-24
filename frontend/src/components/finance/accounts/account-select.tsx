import { Account } from "@/types/finance/accounts.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { formatToLabel } from "@/utils/format-to-label";

type AccountSelectProps = {
  value: Account | undefined;
  accounts: Account[];
  invalid?: boolean;
  disabled?: boolean;
} & (
  | {
      type: 'all';
      setValue: (val: Account | undefined) => void;
    }
  | {
      type?: 'select';
      setValue: (val: Account) => void;
    }
);

export default function AccountSelect({
  value,
  accounts,
  setValue,
  type = "select",
  disabled = false,
}: AccountSelectProps) {
  return (
    <Select
      defaultValue={type}
      onValueChange={(str) => {
        if (str === "all") {
          if (type === "all") (setValue as (val: Account | undefined) => void)(undefined);
          return;
        }

        const acc = accounts.find((item) => item.name.toLowerCase() === str);

        if (acc) setValue(acc);
      }}
      disabled={disabled}
    >
      <SelectTrigger className={
        type === "all" ? "w-[calc(50%)] md:w-40" : "w-full"
      }
      >
        <div>
          <SelectValue>
            <p className="text-sm">
              {((val) => {
                if (!val) return type === "all" ? "All accounts" : "Select an account";

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
            <div className="flex flex-col">
              <p className="text-sm">{acc.name}</p>
              <span className="text-xs text-gray-400">{formatToLabel(acc.type)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}