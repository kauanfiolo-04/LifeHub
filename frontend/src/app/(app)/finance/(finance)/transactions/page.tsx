"use client";

import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/finance/transactions/useTransactions";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function TransactionsPage() {
  const { data: transactions } = useTransactions();

  return (
    <>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <Button variant="secondary">
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>
    </>
  );
}