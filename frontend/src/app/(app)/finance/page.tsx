"use client";

import AccountSelect from "@/components/finance/account-select";
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
        <AccountSelect
          value={accName}
          accounts={accs ?? []} 
          setValue={setAccName}
        />
      </div>
    </div>
  );
}