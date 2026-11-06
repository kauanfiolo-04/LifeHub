import { useId } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { getAccessibleTextColor } from "@/utils/get-acessible-text-color";

export interface ColorPickerProps {
  color?: string;
  setColor: (color: string) => void;
  readOnly?: boolean;
  invalid?: boolean;
  type?: "color" | "input" | "default";
}

const DEFAULT_COLOR = "#000000";

const sanitizeHex = (raw: string) => {
  const digits = raw.toUpperCase().replace(/[^0-9A-F]/g, "");
  return "#" + digits.slice(0, 8);
};

export default function ColorPicker({
  color,
  setColor,
  readOnly = false,
  invalid = false,
  type = "default",
}: ColorPickerProps) {
  const inputId = useId();
  const current = color ?? DEFAULT_COLOR;

  return (
    <Popover modal>
      <PopoverTrigger asChild disabled={readOnly}>
        <Button
          variant="ghost"
          aria-invalid={invalid}
          className="border border-input bg-input/20 rounded-md w-full px-2 py-0.5 disabled:opacity-100! text-sm transition-colors outline-none text-black flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5" style={{ color: current }}>
            <span className="inline-block h-4 w-4 border" style={{ backgroundColor: current }} />
            {current}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        style={{ backgroundColor: color }}
        align="center"
        sideOffset={8}
        collisionPadding={16}
      >
        <PopoverHeader>
          <PopoverTitle
            className="text-xl font-bold"
            style={{ color: color ? getAccessibleTextColor(color) : undefined }}
          >
            Color select
          </PopoverTitle>
        </PopoverHeader>

        <Card className="items-center">
          {(type === "default" || type === "color") && (
            <HexAlphaColorPicker
              color={current}
              onChangeEnd={(newColor) => setColor(newColor.toUpperCase())}
            />
          )}

          {(type === "default" || type === "input") && (
            <Input
              id={inputId}
              aria-label="Hex color"
              className="w-[65%]"
              type="text"
              value={current}
              onChange={(e) => setColor(sanitizeHex(e.target.value))}
            />
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}