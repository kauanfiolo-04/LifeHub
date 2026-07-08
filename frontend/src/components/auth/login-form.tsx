"use client";

import { EyeOffIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useForm, useWatch } from "react-hook-form";
import { LoginRequest } from "@/types/auth.type";
import { useLogin } from "@/hooks/auth/useLogin";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/get-error-message";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const { handleSubmit, register, control } = useForm<LoginRequest>();

  const { mutateAsync, isPending, error, reset } = useLogin();

  const [passType, setPassType] = useState<"password" | "text">("password");

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

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset();
  }, [reset, email, password]);

  return (
    <form className="flex flex-col w-full gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
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
              type={passType}
              placeholder="Enter your password"
              required
            />

            <InputGroupAddon 
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

          {invalidCredentials && (
            <FieldDescription>
              Invalid credentials
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Button size="lg" disabled={isPending} type="submit">
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}