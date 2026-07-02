"use client";

import { EyeOffIcon } from "@hugeicons/core-free-icons";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LoginRequest } from "@/types/auth.type";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const { handleSubmit, register } = useForm<LoginRequest>();

  const { mutateAsync, isPending } = useLogin();

  const handleOnSubmit = async (data: LoginRequest) => {
    try {
      const response = await mutateAsync(data);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col w-full md:w-4/5 gap-10" onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register("email")} id="email" type="email" placeholder="name@example.com"/>
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputGroup>
            <InputGroupInput {...register("password")} id="password" type="password" placeholder="Enter your password"/>

            <InputGroupAddon align="inline-end">
              <HugeiconsIcon icon={EyeOffIcon} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>

      <Button className="h-8">
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}