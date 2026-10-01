"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, Clock01Icon } from "@hugeicons/core-free-icons"
import { Card, CardContent, CardFooter } from "./card"
import { InputGroup, InputGroupInput, InputGroupAddon } from "./input-group"
import { getDateLabel } from "@/utils/get-date-label"
import { useState } from "react"

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  showHours?: boolean;
  defaultValue?: Date;
  readOnly?: boolean;
  invalid?: boolean;
}

export function DatePicker({ value, onChange, showHours = false, readOnly = false, invalid = false, defaultValue = new Date() }: DatePickerProps) {
  const [time, setTime] = useState(
    value
      ? `${String(value.getHours()).padStart(2, "0")}:${String(
        value.getMinutes()
      ).padStart(2, "0")}`
      : `${String(defaultValue.getHours()).padStart(2, "0")}:${String(
        defaultValue.getMinutes()
      ).padStart(2, "0")}`
  );

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);

    if (!newTime || !value) return;

    const [h, m] = newTime.split(":").map(Number);

    const date = new Date(value);
    date.setHours(h, m, 0, 0);

    onChange(date);
  }

  const handleCalendar = (date: Date | undefined) => {
    if (!date) return;

    if (time) {
      const [h, m] = time.split(":").map(Number);
      date.setHours(h, m, 0, 0);
    }

    onChange(date);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          aria-invalid={invalid}
          className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          disabled={readOnly}
        >
          <HugeiconsIcon icon={Calendar03Icon} />
          <span>{value ? getDateLabel(value, showHours) : "Pick a date"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Card>
          <CardContent>
            <Calendar 
              mode="single"
              selected={value}
              onSelect={handleCalendar}
            />
          </CardContent>
          {showHours && (
            <CardFooter>
              <InputGroup>
                <InputGroupInput
                  id="time-from"
                  type="time"
                  step="60"
                  value={time}
                  className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={e => handleTimeChange(e.target.value)}
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={Clock01Icon} className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </CardFooter>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}