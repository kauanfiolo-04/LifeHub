import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { HexAlphaColorPicker } from "react-colorful";
import { Input } from "../ui/input";

export interface ColorPickerProps {
  color?: string;
  setColor: (color: string) => void;
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`border border-input bg-input/20 rounded-md w-full px-2 py-0.5
            text-sm transition-colors outline-none text-black flex items-center justify-between
          `}
        >
          <span>Color:</span>

          <span className="flex items-center gap-1.5" style={{ color: color ?? "#000000" }}>
            <div className="h-4 w-4 border" style={{ backgroundColor: color }} /> {color ?? "#000000"}
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent style={{ backgroundColor: color }}>
        <DialogHeader>
          <DialogTitle className="text-xl">Color select</DialogTitle>
        </DialogHeader>

        <Card className="items-center">
          <HexAlphaColorPicker
            color={color}
            onChangeEnd={newColor => setColor(newColor.toUpperCase())}
          />

          <Input
            className="w-[65%]"
            type="text"
            id="hex"
            value={color ?? "#000000"}
            onChange={(e) => {
              let value = e.target.value.toUpperCase();

              value = value.replace(/[^#0-9A-F]/g, "");

              if (!value.startsWith("#")) {
                value = "#" + value.replace(/#/g, "");
              }

              value = value.slice(0, 9);

              setColor(value);
            }}
          />
        </Card>
      </DialogContent>
    </Dialog>
  );
}