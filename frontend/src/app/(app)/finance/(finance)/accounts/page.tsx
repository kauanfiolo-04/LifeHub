"use client";

import AccountCard from "@/components/finance/accounts/account-card";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

export default function AccountsPage() {
  const router = useRouter();
  
  const { data: accs, isFetching } = useAccounts({ showTransac: true });

  return (
    <>
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accounts</h1>

        <Button
          variant="secondary"
          onClick={() => router.push("/finance/accounts/new")}
        >
          <HugeiconsIcon icon={PlusSignIcon} />
        </Button>
      </div>

      {(!accs || accs.length === 0) ? (
        <h2 
          className="cursor-pointer underline md:no-underline hover:underline"
          onClick={() => router.push("/finance/accounts/new")}
        >
          Please, create an account!
        </h2>
      ) : isFetching ? (
        <div>Loading ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {accs?.map(acc => <AccountCard key={acc.id} account={acc} />)}
        </div>
      )}
    </>
  );
}