"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/format-currency";

type CurrencyInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "type"
> & {
  value?: number | null;
  onValueChange?: (value: number) => void;
};

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "");
      onValueChange?.(Number(digits || 0) / 100);
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={formatCurrency(value ?? 0)}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };