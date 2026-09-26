"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addNotification } from "@/utils/notifications";
import { CreateTransactionRequest, TransactionType } from "@/types/finance/transactions.type";
import useCreateTransaction from "@/hooks/finance/transactions/useCreateTransaction";
import { useAccounts } from "@/hooks/finance/accounts/useAccounts";
import AccountSelect from "@/components/finance/accounts/account-select";
import { Account } from "@/types/finance/accounts.type";

export default function CreateTransactionPage() {
  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<CreateTransactionRequest>();

  const { mutateAsync, isPending, isError } = useCreateTransaction();
  const { data: accs } = useAccounts();

  const [selectedAcc, setSelectedAcc] = useState<Account | undefined>();

  const handleAcc = (val: Account) => {
    setSelectedAcc(val);
    setValue("accountId", val.id);
  }

  const handleOnSubmit = async (data: CreateTransactionRequest) => {
    try {
      await mutateAsync(data, {
        onSuccess: () => {
          addNotification.success("Account created with success!");
          router.push("/finance/accounts");
        },
        onError: () => addNotification.error("Try again later")
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setValue("type", TransactionType.EXPENSE);
  }, [setValue])

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">New Transaction</h1>

      <form className="flex flex-col w-full md:max-w-xl gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              className="md:h-8"
              aria-invalid={isError || !!errors.title?.message}
              {...register("title", {
                minLength: {
                  value: 1,
                  message: "Title must not be empty"
                }
              })}
              id="title"
              type="text"
              required
            />

            {errors.title && (
              <FieldDescription>
                {errors.title.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel>Account</FieldLabel>

            <AccountSelect 
              accounts={accs ?? []}
              value={selectedAcc}
              setValue={handleAcc}
              type="select"
            />
          </Field>
        </FieldGroup>

        <Button size="lg" disabled={isPending} type="submit">
          {isPending ? (
            <>
              <Spinner /> Creating...
            </>
          ) : "Create"}
        </Button>
      </form>
    </>
  );
}