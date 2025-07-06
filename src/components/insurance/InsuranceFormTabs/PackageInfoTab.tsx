"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdNavigateNext } from "react-icons/md";

type Props = {
  name: string;
  period: number;
  timeUnit: "day" | "week" | "month" | "year";
  onChangeName: (value: string) => void;
  onChangePeriod: (value: number) => void;
  onChangeTimeUnit: (value: "day" | "week" | "month" | "year") => void;
  onNext: () => void;
  onCancel: () => void;
};

export default function PackageInfoTab({
  name,
  period,
  timeUnit,
  onChangeName,
  onChangePeriod,
  onChangeTimeUnit,
  onNext,
  onCancel,
}: Props) {
  return (
    <div className="space-y-1">
      <div className="mb-4">
        <Label htmlFor="name" className="mb-2">Package Name</Label>
        <Input
          id="name"
          placeholder="e.g. Student Insurance"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="timeUnit" className="mb-2">Time Unit</Label>
        <Select value={timeUnit} onValueChange={(val) => onChangeTimeUnit(val as any)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <Label htmlFor="period" className="mb-2">Period</Label>
        <Input
          type="number"
          min={1}
          id="period"
          placeholder="e.g. 12"
          value={period}
          onChange={(e) => onChangePeriod(Number(e.target.value))}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onNext}>Next <MdNavigateNext /></Button>
      </div>
    </div>
  );
}
