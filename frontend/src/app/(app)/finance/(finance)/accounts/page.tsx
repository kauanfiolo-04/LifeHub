"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { formatToLabel } from "@/utils/format-to-label";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AccountsPage() {
  const { data: accs } = useAccounts({ showTransac: true });

  return (
    <>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accounts</h1>

        <Button variant="secondary">
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>

      <div className="grid grid-cols-4">
        {accs?.map(acc => (
          <Card key={acc.id}>
            <CardHeader>{acc.name}</CardHeader>
            <CardContent>
              <p>$ {(acc.transactions ?? []).reduce((acc, cur) => {
                acc += cur.amount;
                return acc;
              }, 0)}</p>
              <p>{(acc.transactions ?? []).length} transactions</p>
            </CardContent>
            <CardFooter>{formatToLabel(acc.type)}</CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}