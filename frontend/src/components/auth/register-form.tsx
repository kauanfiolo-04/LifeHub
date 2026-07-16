"use client";

import { EyeOffIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useForm, useWatch } from "react-hook-form";
import { SignUpRequest } from "@/types/auth.type";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/get-error-message";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/auth/useRegister";
import { setAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys";
import { useQueryClient } from "@tanstack/react-query";

export type RegisterFields = SignUpRequest & { confirm: string };

export default function RegisterForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { handleSubmit, register, getValues, formState: { errors: formErrors } } = useForm<RegisterFields>();

  const { mutateAsync, isPending, error, reset } = useRegister();

  const [passType, setPassType] = useState<"password" | "text">("password");
  const [confirmPassType, setConfirmPassType] = useState<"password" | "text">("password");

  const errorMessage = error ? getErrorMessage(error) : undefined;

  const invalidEmail =
    errorMessage === "Email already in use";

  const passwordApiError =
    Array.isArray(errorMessage)
      ? errorMessage.find(msg =>
        msg.includes("password must be longer than or equal to 5 characters")
      )
      : undefined;

  const confirmError = formErrors.confirm?.message;

  const handleOnSubmit = async (data: RegisterFields) => {
    try {
      const { confirm: _, ...signUpData } = data;

      const response = await mutateAsync(signUpData);

      setAccessToken(response.accessToken);

      queryClient.setQueryData(queryKeys.me, response.user);

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col w-full gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            className="md:h-8"
            {...register("name", {
              onChange: () => reset()
            })}
            id="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>

        <Field data-invalid={invalidEmail}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className="md:h-8"
            aria-invalid={invalidEmail}
            {...register("email", {
              onChange: () => reset()
            })}
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />

          {invalidEmail && (
            <FieldDescription>
              Email Invalid!
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!passwordApiError} >
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup className="md:h-8">
            <InputGroupInput
              aria-invalid={!!passwordApiError}
              {...register("password", {
                onChange: () => reset()
              })}
              id="password"
              type={passType}
              placeholder="Enter your password"
              required
            />

            <InputGroupAddon
              className="cursor-pointer"
              align="inline-end"
              onClick={() => {
                setPassType(prev => prev === "password" ? "text" : "password");
              }}
            >
              {passType === "password" ?
                <HugeiconsIcon icon={EyeOffIcon} />
                : <HugeiconsIcon icon={EyeIcon} />}
            </InputGroupAddon>
          </InputGroup>

          {passwordApiError && (
            <FieldDescription>
              Must be longer than or equal to 5 characters.
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!confirmError} >
          <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
          <InputGroup className="md:h-8">
            <InputGroupInput
              aria-invalid={!!confirmError}
              {...register("confirm", {
                deps: ["password"],
                validate: (val) => val === getValues("password") || "Passwords do not match!",
              })}
              id="confirm"
              type={confirmPassType}
              placeholder="Confirm your password"
              required
            />

            <InputGroupAddon
              className="cursor-pointer"
              align="inline-end"
              onClick={() => {
                setConfirmPassType(prev => prev === "password" ? "text" : "password");
              }}
            >
              {confirmPassType === "password" ?
                <HugeiconsIcon icon={EyeOffIcon} />
                : <HugeiconsIcon icon={EyeIcon} />}
            </InputGroupAddon>
          </InputGroup>

          {confirmError && (
            <FieldDescription>
              {confirmError}
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Button size="lg" disabled={isPending} type="submit">
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}