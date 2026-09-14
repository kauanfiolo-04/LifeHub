import { Account } from "@/types/finance/accounts.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dispatch, SetStateAction } from "react";

interface AccountSelectProps {
  value: string;
  accounts: Account[];
  setValue: Dispatch<SetStateAction<string>>;
}

export default function AccountSelect({ value, accounts, setValue }: AccountSelectProps) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger>
        <div>
          <SelectValue>
            <p className="text-sm">
              {((val) => {
                if (val === "all") return "All accounts";

                return val;
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
              <span className="text-xs text-gray-400">{acc.type.toWellFormed()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}