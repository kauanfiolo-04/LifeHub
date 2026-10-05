import { Card, CardContent } from "@/components/ui/card";
import { Transaction, TransactionType } from "@/types/finance/transactions.type";
import { getDateLabel } from "@/utils/get-date-label";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import AccountIcon from "../accounts/account-icon";

interface TransactionCardProps {
  transaction: Transaction;
  router: AppRouterInstance;
}

export default function TransactionCard({ transaction, router }: TransactionCardProps) {
  const { id, title, amount, category, type, account, date } = transaction;

  const isExpense = type === TransactionType.EXPENSE;

  return (
    <Card
      className="w-full min-h-36 cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-500"
      onClick={() => router.push(`/transaction/${id}`)}
    >
      <CardContent className="h-full">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{title}</p>

            <p className="text-base font-medium" style={{ color: isExpense ? "red" : "green" }}>
              {isExpense ? "-" : "+"} ${amount.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-start gap-2 items-center">
            {!!category && <p>{category?.name}</p>}

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
                {getDateLabel(date, true)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}