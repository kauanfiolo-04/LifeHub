"use client";

import AccountCard from "@/components/accounts/AccountCard";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {accs?.map(acc => <AccountCard key={acc.id} account={acc} />)}
      </div>
    </>
  );
}