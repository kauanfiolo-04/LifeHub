"use client";

import AccountIcon from "../accounts/account-icon";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "cn";
import { Transaction, TransactionType } from "@/types/finance/transactions.type";
import { getDateLabel } from "@/utils/get-date-label";
import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/format-currency";

interface TransactionCardProps {
  transaction: Transaction;
  router: AppRouterInstance;
  horizontal?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function TransactionCard({
  transaction,
  router,
  horizontal = false,
  className,
  onClick,
}: TransactionCardProps) {
  const { id, title, amount, category, type, account, date } = transaction;
  const isExpense = type === TransactionType.EXPENSE;
  const dateObj = date instanceof Date ? date : new Date(date);

  const handleClick = onClick ?? (() => {
    router.push(`/finance/transactions/${id}`);
  });

  if (horizontal) {
    return (
      <div
        className={cn(
          "flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer",
          className
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg size-10 shrink-0",
              isExpense
                ? "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                : "bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400"
            )}
          >
            <HugeiconsIcon
              icon={isExpense ? ArrowDown02Icon : ArrowUp02Icon}
              size={20}
            />
          </div>

          <div className="flex flex-col min-w-0 gap-0.5">
            <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
              {title}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 shrink-0">
                <AccountIcon accType={account.type} size={14} />
                <span>{account.name}</span>
              </div>

              {category && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 shrink-0">
                    {category.color && (
                      <span
                        className="size-2 rounded-full inline-block"
                        style={{
                          backgroundColor: category.color,
                        }}
                      />
                    )}
                    <span>{category.name}</span>
                  </span>
                </>
              )}

              <span>•</span>
              <span className="flex items-center gap-1 shrink-0">
                <HugeiconsIcon icon={Calendar03Icon} size={12} />
                <span>{getDateLabel(dateObj, true)}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0 ml-3">
          <p
            className={cn(
              "text-sm font-bold tracking-tight",
              isExpense ? "text-red-500" : "text-green-500"
            )}
          >
            {isExpense ? "-" : "+"} {formatCurrency(amount)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "w-full min-h-36 cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-500",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="h-full">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{title}</p>

            <p
              className={cn(
                "text-base font-medium",
                isExpense ? "text-red-500" : "text-green-500"
              )}
            >
              {isExpense ? "-" : "+"} {formatCurrency(amount)}
            </p>
          </div>

          <div className="flex justify-start gap-2 items-center">
            {!!category && (
              <div className="flex items-center gap-1">
                {category.color && (
                  <span
                    className="size-2 rounded-full inline-block"
                    style={{ backgroundColor: category.color }}
                  />
                )}
                <p>{category.name}</p>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <AccountIcon accType={account.type} size={18} />
              <p className="text-sm">{account.name}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-baseline">
              <HugeiconsIcon
                size={14}
                icon={Calendar03Icon}
                className="translate-y-0.5 self-baseline"
              />

              <span className="text-xs leading-none">
                {getDateLabel(dateObj, true)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
