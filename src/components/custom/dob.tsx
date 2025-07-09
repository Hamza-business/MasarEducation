"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, isFuture } from "date-fns";


type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export function DateOfBirthPicker({ value, onChange }: Props) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1 mb-0">
        Date of birth *
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            captionLayout="dropdown"
            startMonth={new Date(1940,0)}
            endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
            required={true}
            onSelect={(d) => {
              if (d && !isFuture(d)) {
                onChange(d);
                setDate(d);
                setOpen(false); // close after selecting
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
