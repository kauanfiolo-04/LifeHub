"use client";

import AccountCard from "@/components/finance/accounts/account-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { PlusSignIcon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

function AccountsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-7 w-36" />
          </div>
          <Skeleton className="h-3.5 w-20 pt-2" />
        </Card>
      ))}
    </div>
  );
}

export default function AccountsPage() {
  const router = useRouter();

  const { data: accs, isLoading, isFetching } = useAccounts({ showTransac: true });

  const loading = isLoading || isFetching;

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

      {loading && !accs ? (
        <AccountsLoadingSkeleton />
      ) : !accs || accs.length === 0 ? (
        <Card className="w-full p-8 border-dashed flex flex-col items-center justify-center text-center gap-3 bg-card/40 my-4">
          <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <HugeiconsIcon icon={Wallet01Icon} size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base">No accounts registered</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Add your bank accounts, credit cards, or cash to start tracking your finances.
            </p>
          </div>
          <Button
            onClick={() => router.push("/finance/accounts/new")}
            className="gap-2 mt-2"
            size="sm"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>Create Account</span>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accs.map((acc) => (
            <AccountCard key={acc.id} account={acc} />
          ))}
        </div>
      )}
    </>
  );
}
