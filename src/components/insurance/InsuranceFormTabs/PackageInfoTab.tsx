"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdNavigateNext } from "react-icons/md";

type Props = {
  name: string;
  unit: "day" | "week" | "month" | "year";
  period: number;
  onChangeName: (value: string) => void;
  onChangeUnit: (value: "day" | "week" | "month" | "year") => void;
  onChangePeriod: (value: number) => void;
  onNext: () => void;
  onCancel: () => void;
};

export default function PackageInfoTab({
  name,
  unit,
  period,
  onChangeName,
  onChangeUnit,
  onChangePeriod,
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
        <Label htmlFor="unit" className="mb-2">Time Unit</Label>
        <Select value={unit} onValueChange={(val) => onChangeUnit(val as any)}>
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
