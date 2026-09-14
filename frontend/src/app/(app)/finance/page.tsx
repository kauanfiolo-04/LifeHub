"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { useFinance } from "@/hooks/finance/useFinance";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FinancePage() {
  const [accName, setAccName] = useState<string>("all");

  const { data: finance } = useFinance(accName);
  const { data: accs } = useAccounts();

  useEffect(() => {
    console.log(finance, accs);
  }, [finance, accs]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Finance</h1>
      </div>

      <div className="flex w-full items-center justify-between">
        <Select onValueChange={setAccName}>
          <SelectTrigger>
            <SelectValue placeholder="All accounts"/>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              {/* <Image width={12} height={12} src="https://thumbs.dreamstime.com/b/ma%C3%A7%C3%A3-quadrada-em-um-fundo-branco-6016067.jpg" /> */}
              All accounts
            </SelectItem>
            {accs?.map(acc => (
              <SelectItem
                key={acc.id}
                value={acc.name.toLowerCase()}
              >
                <p>{acc.name}</p>
                <span>{acc.type.toWellFormed()}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}