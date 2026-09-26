import { AccountType } from "@/types/finance/accounts.type";
import { BankIcon, Cash02Icon, CreditCardIcon, PiggyBankIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AccountIcon({ accType, size }: { accType: AccountType, size?: number }) {
  if (accType === AccountType.CASH) 
    return <HugeiconsIcon icon={Cash02Icon} size={size} />;

  if (accType === AccountType.CHECKING) 
    return <HugeiconsIcon icon={BankIcon} size={size} />;

  if (accType === AccountType.CREDIT_CARD) 
    return <HugeiconsIcon icon={CreditCardIcon} size={size} />;

  if (accType === AccountType.SAVINGS) 
    return <HugeiconsIcon icon={PiggyBankIcon} size={size} />;

  return null;
}