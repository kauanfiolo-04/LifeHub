"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Account, AccountType } from "@/types/finance/accounts.type";
import { TransactionType } from "@/types/finance/transactions.type";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatToLabel } from "@/utils/format-to-label";
import { cn } from "cn";
import AccountIcon from "./accounts/account-icon";
import {
  Wallet01Icon,
  PlusSignIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatCurrency } from "@/utils/format-currency";

interface AccountBalancesProps {
  accounts?: Account[];
  isLoading?: boolean;
  selectedAccountId?: string;
  onSelectAccount?: (account: Account) => void;
  className?: string;
  showAddCard?: boolean;
}

// Configuração visual para cada tipo de conta
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

/**
 * Calcula o saldo atual de uma conta com base em suas transações
 */
export function calculateAccountBalance(account: Account): number {
  if (!account.transactions || account.transactions.length === 0) {
    return 0;
  }

  return account.transactions.reduce((acc, cur) => {
    if (cur.type === TransactionType.INCOME) {
      return acc + Number(cur.amount);
    }
    return acc - Number(cur.amount);
  }, 0);
}

export default function AccountBalances({
  accounts: propAccounts,
  isLoading: propIsLoading,
  selectedAccountId,
  onSelectAccount,
  className,
  showAddCard = true,
}: AccountBalancesProps) {
  const router = useRouter();
  const [showValues, setShowValues] = useState(true);

  // Busca contas com transações para cálculo exato de saldo se não forem passadas via props
  const { data: fetchedAccounts, isLoading: queryIsLoading } = useAccounts({
    showTransac: true,
  });

  const isLoading = propIsLoading ?? queryIsLoading;
  const accounts = useMemo(
    () => propAccounts ?? fetchedAccounts ?? [],
    [propAccounts, fetchedAccounts]
  );

  // Saldo consolidado total e contagem
  const { totalBalance, accountBalances } = useMemo(() => {
    let total = 0;
    const balances = new Map<string, number>();

    for (const acc of accounts) {
      const balance = calculateAccountBalance(acc);
      balances.set(acc.id, balance);
      total += balance;
    }

    return { totalBalance: total, accountBalances: balances };
  }, [accounts]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-4 w-full", className)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border bg-card/60">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-3 w-20" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Empty state quando o usuário ainda não cadastrou nenhuma conta
  if (accounts.length === 0) {
    return (
      <Card
        className={cn(
          "w-full p-8 border-dashed flex flex-col items-center justify-center text-center gap-3 bg-card/50",
          className
        )}
      >
        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
          <HugeiconsIcon icon={Wallet01Icon} size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-base">No accounts registered</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Add your bank accounts, credit cards, or cash to start tracking your balances in real time.
          </p>
        </div>
        <Button
          onClick={() => router.push("/finance/accounts/new")}
          className="gap-2 mt-2"
          size="sm"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          <span>Add First Account</span>
        </Button>
      </Card>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {/* Indicador de Saldo Total Consolidado */}
      <div className="relative overflow-hidden rounded-xl border bg-linear-to-br from-card via-card to-muted/30 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary shrink-0 ring-1 ring-primary/20">
              <HugeiconsIcon icon={Wallet01Icon} size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Consolidated Balance
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <p
                  className={cn(
                    "text-2xl sm:text-3xl font-extrabold tracking-tight",
                    totalBalance < 0 && "text-red-500"
                  )}
                >
                  {showValues ? formatCurrency(totalBalance) : "••••••••"}
                </p>
              </div>
            </div>
          </div>

          {/* Ações Consolidadas */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowValues(!showValues)}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              title={showValues ? "Hide balances" : "Show balances"}
            >
              <HugeiconsIcon
                icon={showValues ? EyeOffIcon : EyeIcon}
                size={16}
              />
              <span className="hidden xs:inline">
                {showValues ? "Hide" : "Show"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/finance/accounts")}
              className="gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span>Manage</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Mini-Cards por Conta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {accounts.map((account) => {
          const balance = accountBalances.get(account.id) ?? 0;
          const style = ACCOUNT_TYPE_STYLES[account.type] || ACCOUNT_TYPE_STYLES[AccountType.CHECKING];
          const isSelected = selectedAccountId === account.id;
          const transacCount = account.transactions?.length ?? 0;

          return (
            <Card
              key={account.id}
              onClick={() => onSelectAccount?.(account)}
              className={cn(
                "group relative transition-all duration-200 border hover:border-foreground/20 hover:shadow-xs",
                onSelectAccount && "cursor-pointer",
                isSelected && "ring-2 ring-primary border-primary bg-primary/2"
              )}
            >
              <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                {/* Top: Ícone e Tipo */}
                <div className="flex items-center justify-between">
                  <AccountIcon accType={account.type} size={18} bg={true} />

                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
                      style.bgBadge,
                      style.textBadge
                    )}
                  >
                    {formatToLabel(account.type)}
                  </span>
                </div>

                {/* Middle: Nome e Saldo */}
                <div>
                  <h4
                    className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors"
                    title={account.name}
                  >
                    {account.name}
                  </h4>

                  <p
                    className={cn(
                      "text-xl font-bold tracking-tight mt-1",
                      balance < 0 ? "text-red-500" : "text-foreground"
                    )}
                  >
                    {showValues ? formatCurrency(balance) : "••••••"}
                  </p>
                </div>

                {/* Bottom: Metadados */}
                <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                  <span>
                    {transacCount} {transacCount === 1 ? "transaction" : "transactions"}
                  </span>

                  {account.type === AccountType.CREDIT_CARD && (
                    <span className="text-[10px] text-muted-foreground/80">
                      Credit Limit / Bill
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Mini-Card de Atalho para Nova Conta */}
        {showAddCard && (
          <button
            type="button"
            onClick={() => router.push("/finance/accounts/new")}
            className="flex flex-col items-center justify-center gap-2 min-h-35 rounded-xl border border-dashed border-border/80 bg-card/40 p-4 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-muted/30 hover:text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <HugeiconsIcon icon={PlusSignIcon} size={18} />
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold block">New Account</span>
              <span className="text-[11px] text-muted-foreground/80">
                Add another bank or card
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
