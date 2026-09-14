import { Account } from "@/types/finance/accounts.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dispatch, SetStateAction } from "react";
import { formatToLabel } from "@/utils/format-to-label";

interface AccountSelectProps {
  value: string;
  accounts: Account[];
  setValue: Dispatch<SetStateAction<string>>;
}

export default function AccountSelect({ value, accounts, setValue }: AccountSelectProps) {
  return (
    <Select defaultValue="all" onValueChange={setValue}>
      <SelectTrigger className="w-[calc(50%-8px)] md:w-40">
        <div>
          <SelectValue>
            <p className="text-sm">
              {((val) => {
                if (val === "all") return "All accounts";

                return formatToLabel(val);
              })(value)}
            </p>
          </SelectValue>
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          {/* <Image width={12} height={12} src="https://thumbs.dreamstime.com/b/ma%C3%A7%C3%A3-quadrada-em-um-fundo-branco-6016067.jpg" /> */}
          <p className="text-sm">All accounts</p>
        </SelectItem>
        {accounts.map(acc => (
          <SelectItem
            key={acc.id}
            value={acc.name.toLowerCase()}
          >
            <div>
              <p className="text-sm">{acc.name}</p>
              <span className="text-xs text-gray-400">{formatToLabel(acc.type)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}