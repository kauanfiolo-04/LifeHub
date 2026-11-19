import { AccountType } from "@/types/finance/accounts.type";
import { BankIcon, Cash02Icon, CreditCardIcon, PiggyBankIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AccountIcon({ accType, size }: { accType: AccountType, size?: number }) {
  if (accType === AccountType.CASH) return (
    <div className="flex items-center justify-center size-9 rounded-lg border bg-amber-500/10 text-amber-600 dark:text-amber-400">
      <HugeiconsIcon icon={Cash02Icon} size={size} />
    </div>
  );

  if (accType === AccountType.CHECKING) return (
    <div className="flex items-center justify-center size-9 rounded-lg border bg-blue-500/10 text-blue-600 dark:text-blue-400">
      <HugeiconsIcon icon={BankIcon} size={size} />
    </div>
  );
    // return <HugeiconsIcon icon={BankIcon} size={size} />;

  if (accType === AccountType.CREDIT_CARD) return (
    <div className="flex items-center justify-center size-9 rounded-lg border bg-purple-500/10 text-purple-600 dark:text-purple-400">
      <HugeiconsIcon icon={CreditCardIcon} size={size} />
    </div>
  );
    // return <HugeiconsIcon icon={CreditCardIcon} size={size} />;

  if (accType === AccountType.SAVINGS) return (
    <div className="flex items-center justify-center size-9 rounded-lg border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
      <HugeiconsIcon icon={PiggyBankIcon} size={size} />
    </div>
  );
    // return <HugeiconsIcon icon={PiggyBankIcon} size={size} />;

  return null;
}