"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon } from "@hugeicons/core-free-icons"

interface DatePickerProps {
  value?: Date;
  onChange?: (date?: Date) => void;
  readOnly?: boolean;
}

export function DatePicker({ value, onChange, readOnly = false } : DatePickerProps) {
  console.log(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          disabled={readOnly}
        >
          <HugeiconsIcon icon={Calendar03Icon} />
          <span>{value ? value.toLocaleDateString() : "Pick a date"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}