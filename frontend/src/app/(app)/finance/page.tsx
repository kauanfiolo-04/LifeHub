"use client";

import AccountSelect from "@/components/finance/accounts/account-select";
import MetricsBoxes from "@/components/finance/metrics-boxes";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { useFinance } from "@/hooks/finance/useFinance";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FinancePage() {
  const router = useRouter();

  const [accName, setAccName] = useState<string>("all");

  const { data: finance } = useFinance(accName);
  const { data: accs } = useAccounts();

  useEffect(() => {
    console.log(finance, accs);
  }, [finance, accs]);

  return (
    <>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Finance</h1>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex w-full items-center justify-between">
          <AccountSelect
            value={accName}
            accounts={accs ?? []} 
            setValue={setAccName}
          />

          <Button className="w-[calc(50%-8px)] md:w-40 gap-2" variant="outline" onClick={() => router.push("/transactions/new")}>
            <HugeiconsIcon icon={PlusSignIcon} />
            <span>New transaction</span>
          </Button>
        </div>
        
        <MetricsBoxes 
          metrics={finance ?? { balance: 0, totalExpenses: 0, totalIncomes: 0 }}
        />
      </div>
    </>
  );
}