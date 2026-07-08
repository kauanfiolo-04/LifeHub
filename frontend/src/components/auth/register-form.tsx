"use client";

import { EyeOffIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useForm, useWatch } from "react-hook-form";
import { LoginRequest, SignUpRequest } from "@/types/auth.type";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/get-error-message";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/auth/useRegister";

export type RegisterFields = Array<keyof SignUpRequest | "confirm">;

export default function RegisterForm() {
  // const router = useRouter();

  const { handleSubmit, register, control } = useForm<SignUpRequest>();

  const { mutateAsync, isPending, error, reset } = useRegister();

  const [passType, setPassType] = useState<"password" | "text">("password");
  const [confirmPassType, setConfirmPassType] = useState<"password" | "text">("password");
  const [invalidFields, setInvalidFields] = useState<RegisterFields>([]);

  const name = useWatch({
    control,
    name: "name"
  });

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

  const handleOnSubmit = async (data: SignUpRequest) => {
    try {
      const response = await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset();
  }, [reset, email, password, name]);

  return (
    <form className="flex flex-col w-full gap-10" onSubmit={(e) => handleSubmit(handleOnSubmit)(e)}>
      <FieldGroup>
        <Field data-invalid={invalidCredentials} >
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            className="md:h-8"
            aria-invalid={invalidCredentials}
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
            required
          />

          {invalidCredentials && (
            <FieldDescription>
              Invalid credentials
            </FieldDescription>
          )}
        </Field>
        
        <Field data-invalid={invalidCredentials}>
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

        <Field data-invalid={invalidCredentials} >
          <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
          <InputGroup className="md:h-8">
            <InputGroupInput
              aria-invalid={invalidCredentials}
              id="password"
              type={confirmPassType}
              placeholder="Confirm your password"
              required
            />

            <InputGroupAddon 
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

          {invalidCredentials && (
            <FieldDescription>
              Invalid credentials
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