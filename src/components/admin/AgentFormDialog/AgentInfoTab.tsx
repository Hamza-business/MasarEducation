"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdNavigateNext } from "react-icons/md";
import { agentInfoType } from "@/types/all";
import Link from "next/link";

type Props = {
  agentInfo: agentInfoType;
  setAgentInfo: (agentInfo: agentInfoType)=>void;
  onNext: () => void;
  onCancel: () => void;
};

export default function AgentInfoTab({
  agentInfo,
  setAgentInfo,
  onNext,
  onCancel,
}: Props) {
  return (
    <div className="space-y-1">
          <div className="space-y-4">
      <div className="mb-5">
        <Label className="mb-2">Agent Name</Label>
        <Input
          value={agentInfo.agent_name}
          onChange={(e) => setAgentInfo({ ...agentInfo, agent_name: e.target.value })}
          placeholder="Enter agent name"
        />
      </div>

      <div className="mb-5">
        <Label className="mb-2">Agent Referral Link</Label>
        <div className="flex items-center">
          <span className="bg-muted px-3 py-2 rounded-sm text-sm rounded-tr-none rounded-br-none">https://masar.edu/</span>
          <Input
            className="flex-1 rounded-none"
            value={agentInfo.url}
            onChange={(e) => setAgentInfo({ ...agentInfo, url: e.target.value.toLowerCase().replaceAll(" ", "-").replaceAll(".", "-").replaceAll("#", "-").replaceAll("$", "-").replaceAll("@", "-") })}
            placeholder="custom-slug"
          />
          <span className="bg-muted px-3 py-2 rounded-sm text-sm rounded-tl-none rounded-bl-none">/services/insurance/order</span>
        </div>
        <p className="text-xs mt-1 text-muted-foreground">Agent Referral Link Will be: 
          {agentInfo.url && (
            <a href={`https://masar.edu/${agentInfo.url}/services/insurance/order`} className="text-blue-400"> https://masar.edu/{agentInfo.url}/services/insurance/order</a>
          )}
        </p>
      </div>

      <div className="mb-5">
        <Label className="mb-2">Percent</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={agentInfo.percent}
          onChange={(e) => setAgentInfo({ ...agentInfo, percent: Number(e.target.value) })}
        />
      </div>
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
