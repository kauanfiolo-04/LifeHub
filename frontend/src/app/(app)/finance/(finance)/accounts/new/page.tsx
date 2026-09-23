"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addNotification } from "@/utils/notifications";
import { AccountType, CreateAccountRequest } from "@/types/finance/accounts.type";
import useCreateAccount from "@/hooks/finance/accounts/useCreateAccount";
import AccountTypeSelect from "@/components/finance/accounts/account-type-select";

export default function CreateAccountPage() {
  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<CreateAccountRequest>();

  const { mutateAsync, isPending, isError } = useCreateAccount();

  const type = useWatch({
    control,
    name: "type",
    defaultValue: AccountType.CHECKING
  });

  const handleType = (val: AccountType) => 
    setValue("type", val);

  const handleOnSubmit = async (data: CreateAccountRequest) => {
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
    setValue("type", AccountType.CHECKING);
    setValue("initialBalance", 0);
  }, [setValue])

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">New Task</h1>

      <form className="flex flex-col w-full md:max-w-xl gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              className="md:h-8"
              aria-invalid={isError || !!errors.name?.message}
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name must not be empty"
                }
              })}
              id="title"
              type="text"
              required
            />

            {errors.name && (
              <FieldDescription>
                {errors.name.message}
              </FieldDescription>
            )}
          </Field>

          <AccountTypeSelect 
            value={type}
            setValue={handleType}
          />

          <Field>
            <FieldLabel htmlFor="initial_balance">Initial balance</FieldLabel>
            <Input
              {...register("initialBalance", { valueAsNumber: true })}
              id="initial_balance"
              type="number"
            />

            {errors.initialBalance && (
              <FieldDescription>
                {errors.initialBalance.message}
              </FieldDescription>
            )}
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