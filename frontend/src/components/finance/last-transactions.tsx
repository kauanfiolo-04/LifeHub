"use client";

import TransactionCard from "@/components/finance/transactions/transaction-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/hooks/finance/transactions/useTransactions";
import { cn } from "cn";
import { Transaction } from "@/types/finance/transactions.type";
import {
  ArrowRight01Icon,
  Invoice01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

interface LastTransactionsProps {
  accountName?: string;
  limit?: number;
  className?: string;
  transactions?: Transaction[];
  isLoading?: boolean;
}

export default function LastTransactions({
  accountName,
  limit = 5,
  className,
  transactions: propTransactions,
  isLoading: propIsLoading,
}: LastTransactionsProps) {
  const router = useRouter();

  const { data: response, isLoading: queryIsLoading } = useTransactions({
    accountName: accountName === "all" ? undefined : accountName,
    limit,
  });

  const isLoading = propIsLoading ?? queryIsLoading;
  const transactions = propTransactions ?? response?.data ?? [];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-semibold">
            Last Transactions
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {accountName && accountName !== "all"
              ? `Recent activity for ${accountName}`
              : "Your most recent financial activity"}
          </CardDescription>
        </div>

        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/finance/transactions")}
          >
            <span>View all</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex flex-col divide-y divide-border/60">
            {Array.from({ length: limit }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 px-1"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
            <div className="flex items-center justify-center rounded-full size-12 bg-muted text-muted-foreground">
              <HugeiconsIcon icon={Invoice01Icon} size={24} />
            </div>
            <p className="text-sm font-medium">No transactions found</p>
            <p className="text-xs text-muted-foreground">
              Transactions will appear here once you record them.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 gap-1.5"
              onClick={() => router.push("/finance/transactions/new")}
            >
              <HugeiconsIcon icon={PlusSignIcon} size={14} />
              <span>New transaction</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border/60">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                router={router}
                horizontal
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
