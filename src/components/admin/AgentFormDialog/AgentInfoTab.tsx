"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdNavigateNext } from "react-icons/md";

type Props = {
  onNext: () => void;
  onCancel: () => void;
};

export default function AgentInfoTab({
  onNext,
  onCancel,
}: Props) {
  return (
    <div className="space-y-1">
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onNext}>Next <MdNavigateNext /></Button>
      </div>
    </div>
  );
}
