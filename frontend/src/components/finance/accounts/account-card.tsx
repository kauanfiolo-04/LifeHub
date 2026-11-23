"use client";

import { Account, AccountType } from "@/types/finance/accounts.type";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatToLabel } from "@/utils/format-to-label";
import { TransactionType } from "@/types/finance/transactions.type";
import AccountIcon from "./account-icon";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "cn";

interface AccountCardProps {
  account: Account;
}

const ACCOUNT_TYPE_STYLES: Record<
  AccountType,
  {
    bgBadge: string;
    textBadge: string;
  }
> = {
  [AccountType.CHECKING]: {
    bgBadge: "bg-blue-500/10",
    textBadge: "text-blue-600 dark:text-blue-400",
  },
  [AccountType.SAVINGS]: {
    bgBadge: "bg-emerald-500/10",
    textBadge: "text-emerald-600 dark:text-emerald-400",
  },
  [AccountType.CREDIT_CARD]: {
    bgBadge: "bg-purple-500/10",
    textBadge: "text-purple-600 dark:text-purple-400",
  },
  [AccountType.CASH]: {
    bgBadge: "bg-amber-500/10",
    textBadge: "text-amber-600 dark:text-amber-400",
  },
};

export default function AccountCard({ account }: AccountCardProps) {
  const router = useRouter();

  const transacLength = account.transactions?.length ?? 0;

  const balance = (account.transactions ?? []).reduce((acc, cur) => {
    if (cur.type === TransactionType.INCOME) {
      return acc + Number(cur.amount);
    }
    return acc - Number(cur.amount);
  }, 0);

  const style = ACCOUNT_TYPE_STYLES[account.type] || ACCOUNT_TYPE_STYLES[AccountType.CHECKING];

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:border-foreground/30 hover:shadow-xs group"
      onClick={() => router.push(`/finance/accounts/${account.id}`)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex gap-2.5 items-center text-base md:text-lg font-semibold truncate group-hover:text-primary transition-colors">
          <AccountIcon accType={account.type} size={20} bg={true} />
          <span className="truncate" title={account.name}>{account.name}</span>
        </div>

        <span
          className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0",
            style.bgBadge,
            style.textBadge
          )}
        >
          {formatToLabel(account.type)}
        </span>
      </CardHeader>

      <CardContent className="pt-2">
        <p
          className={cn(
            "text-2xl font-bold tracking-tight",
            balance < 0 ? "text-destructive" : "text-foreground"
          )}
        >
          {formatCurrency(balance)}
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          {transacLength} transaction{transacLength === 1 ? "" : "s"}
        </p>
      </CardContent>

      <CardFooter className="pt-1 text-xs text-muted-foreground flex justify-between items-center">
        <span>Click to view & edit</span>
        <span className="text-[11px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          View details &rarr;
        </span>
      </CardFooter>
    </Card>
  );
}
