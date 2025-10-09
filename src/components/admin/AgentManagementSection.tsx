'use client';

import { useState } from 'react';
import { AgentInfo } from '@/types/all';
import { Button } from '@/components/ui/button';
import { CgAddR } from 'react-icons/cg';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { exportToExcel, fetchAgentData } from '@/lib/exportData';

interface AgentManagementSectionProps {
  parentLVL: number;
  agentName: string;
  parentid: number;
  agents: AgentInfo[];
  isLoading: boolean;
  onExport: () => Promise<void>;
  onOpenDialog: () => void;
  children: React.ReactNode;
}

export function AgentManagementSection({
  parentLVL,
  agentName,
  parentid,
  agents,
  isLoading,
  onExport,
  onOpenDialog,
  children,
}: AgentManagementSectionProps) {
  if (parentLVL >= 3) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-bold">
            {parentLVL === 1 ? "Agents" : "subAgents"}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage{' '}
            <span className="font-semibold text-zinc-600 dark:text-gray-300">
              {agentName}&#39;
            </span>
            s {parentLVL === 1 ? "Agents" : "subAgents"}
          </p>
        </div>
        {parentLVL < 3 && (
          <Button onClick={onOpenDialog}>
            <CgAddR /> Create New {parentLVL === 1 ? "Agent" : "subAgent"}
          </Button>
        )}
      </div>

      <Button
        onClick={onExport}
        disabled={isLoading}
        className="bg-[#1f9d61] hover:bg-[#1f9d61] text-white flex items-center gap-2 mb-2"
      >
        <PiMicrosoftExcelLogo className="text-white text-lg" />
        {isLoading ? 'Fetching...' : 'Export subAgents'}
      </Button>

      <div className="mb-10">{children}</div>
    </>
  );
}
