import { Account, AccountType } from "@/types/finance/accounts.type";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatToLabel } from "@/utils/format-to-label";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { Button } from "../../ui/button";
import { TransactionType } from "@/types/finance/transactions.type";
import AccountIcon from "./account-icon";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useMobile";
import { useDeleteAccount } from "@/hooks/finance/accounts/useDeleteAccount";
import { MouseEventHandler } from "react";
import { addNotification } from "@/utils/notifications";
import { getErrorMessage } from "@/utils/get-error-message";

interface AccountCardProps {
  account: Account;
}

interface HeaderProps {
  accType: AccountType;
  accName: string;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ accType, accName, onDelete }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <CardHeader className="flex items-center justify-between">
      <div className="flex gap-2 items-center text-lg md:text-xl">
        <AccountIcon accType={accType} size={isMobile ? 18 : 22} />
        {accName}
      </div>

      <Button
        variant={isMobile ? "destructive" : "delete"}
        className="w-8 h-8 md:w-10 md:h-10 [&_svg:not([class*='size-'])]:h-4 [&_svg:not([class*='size-'])]:w-4 md:[&_svg:not([class*='size-'])]:h-5 md:[&_svg:not([class*='size-'])]:w-5"
        onClick={onDelete}
      >
        <HugeiconsIcon icon={Delete02Icon} size={isMobile ? 18 : 22} />
      </Button>
    </CardHeader>
  );
};

export default function AccountCard({ account }: AccountCardProps) {
  const router = useRouter();

  const transacLength = account.transactions.length;

  const { mutateAsync  } = useDeleteAccount();

  const onDelete: MouseEventHandler<HTMLButtonElement> = e => {
    try {
      e.stopPropagation();
      mutateAsync({ id: account.id }, {
        onSuccess: () => {
          addNotification.success("Account deleted with success!")
          router.push("/tasks");
        },
        onError: (e) => {
          const message = getErrorMessage(e);
          addNotification.error(Array.isArray(message) ? message.join(", ") : message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card 
      className="cursor-pointer" 
      onClick={() => router.push(`/finance/accounts/${account.id}`)}
    >
      <Header
        accName={account.name}
        accType={account.type}
        onDelete={onDelete}
      />

      <CardContent>
        <p>
          $ {(account.transactions ?? [])
            .reduce((account, cur) => {
              if (cur.type === TransactionType.INCOME) {
                account += cur.amount;
              } else {
                account -= cur.amount;
              }
              return account;
            }, 0)
          }
        </p>
        
        {!!transacLength && <p>{transacLength} transaction{transacLength > 1 && "s"}</p>}
      </CardContent>

      <CardFooter>{formatToLabel(account.type)}</CardFooter>
    </Card>
  );
}