"use client";

import { useTransactions } from "@/hooks/finance/transactions/useTransactions";
import { useEffect, useState } from "react";

export default function FinancePage() {
  const [accName, setAccName] = useState<string | undefined>();

  const { data } = useTransactions(accName)

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Finance</h1>
      </div>

      
    </div>
  );
}