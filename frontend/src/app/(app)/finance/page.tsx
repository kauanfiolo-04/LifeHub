"use client";

import {
  ConsolidatedBalanceCard,
  AccountCardsGrid,
} from "@/components/finance/account-balances";
import AccountSelect from "@/components/finance/accounts/account-select";
import { ExpensesByCategory } from "@/components/finance/expenses-by-category";
import LastTransactions from "@/components/finance/last-transactions";
import MetricsBoxes from "@/components/finance/metrics-boxes";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { useFinance } from "@/hooks/finance/useFinance";
import { Account } from "@/types/finance/accounts.type";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FinancePage() {
  const router = useRouter();

  const [acc, setAcc] = useState<Account | undefined>();
  const [showValues, setShowValues] = useState(true);

  const { data: finance } = useFinance(acc?.name ?? "all");
  const { data: accs } = useAccounts();

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Finance</h1>

        <div className="flex gap-3 w-full md:w-auto">
          <AccountSelect
            value={acc}
            accounts={accs ?? []}
            setValue={setAcc}
            type="all"
          />

          <Button
            className="w-[calc(50%)] gap-2"
            variant="outline"
            onClick={() => router.push("/finance/transactions/new")}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            <span>New transaction</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ConsolidatedBalanceCard
          showValues={showValues}
          onToggleShowValues={() => setShowValues((prev) => !prev)}
        />

        <MetricsBoxes
          showValues={showValues}
          metrics={{
            balance: finance?.balance ?? 0,
            totalExpenses: finance?.totalExpenses ?? 0,
            totalIncomes: finance?.totalIncomes ?? 0,
          }}
        />

        <AccountCardsGrid
          showValues={showValues}
          selectedAccountId={acc?.id}
          onSelectAccount={(account) => {
            if (!account) {
              setAcc(undefined);
            } else {
              setAcc((cur) => (cur?.id === account.id ? undefined : account))
            }
          }
          }
        />

        <ExpensesByCategory data={finance?.expensesByCategory ?? []} />

        <LastTransactions accountName={acc?.name} />
      </div>
    </>
  );
}
