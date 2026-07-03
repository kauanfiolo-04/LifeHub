"use client";

import { EyeOffIcon } from "@hugeicons/core-free-icons";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useForm, useWatch } from "react-hook-form";
import { LoginRequest } from "@/types/auth.type";
import { useLogin } from "@/hooks/useLogin";
import OAuthButtons from "./oauth-buttons";
import { Separator } from "../ui/separator";
import { useEffect } from "react";
import { getErrorMessage } from "@/utils/get-error-message";

export default function LoginForm() {
  const { handleSubmit, register, control } = useForm<LoginRequest>();

  const { mutateAsync, isPending, error, reset } = useLogin();

  const email = useWatch({
    control,
    name: "email"
  });

  const password = useWatch({
    control,
    name: "password"
  });

  const invalidCredentials =
    getErrorMessage(error) === "Credential not found!";

  const handleOnSubmit = async (data: LoginRequest) => {
    try {
      const response = await mutateAsync(data);

      localStorage.setItem(
        "accessToken",
        response.accessToken
      );

      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset();
  }, [reset, email, password]);

  return (
    <form className="flex flex-col w-full md:w-4/5 gap-10" onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <Field data-invalid={invalidCredentials} >
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className="md:h-8"
            aria-invalid={invalidCredentials}
            {...register("email")}
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />

          {invalidCredentials && (
            <FieldDescription>
              Invalid credentials
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={invalidCredentials} >
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup className="md:h-8">
            <InputGroupInput
              aria-invalid={invalidCredentials}
              {...register("password")}
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />

            <InputGroupAddon align="inline-end">
              <HugeiconsIcon icon={EyeOffIcon} />
            </InputGroupAddon>
          </InputGroup>

          {invalidCredentials && (
            <FieldDescription>
              Invalid credentials
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-2">
        <Button size="lg" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>

        <div className="flex items-center max-w-full gap-2">
          <Separator className="flex-1" orientation="horizontal" />

          <span>Or sign in with</span>

          <Separator className="flex-1" orientation="horizontal" />
        </div>

        <OAuthButtons />
      </div>
    </form>
  );
}