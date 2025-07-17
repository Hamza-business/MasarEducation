"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AgentInfoTab from "./AgentFormDialog/AgentInfoTab";
import UserInfoTab from "./AgentFormDialog/UserInfoTab";
import { Tabs} from "@/components/ui/tabs";
import type { agentImageType, AgentInfo, agentInfoType, agentUserType, InsurancePackage, PriceRange } from "@/types/all";
import TabNavigation from "./AgentFormDialog/TabNavigation";
import { validateInsurancePackage } from "@/components/validations/validateInsurancePackage";
import { toastValidationErorr } from "../notifications/toast";
import ImageUploadTab from "./AgentFormDialog/ImageUploadTab";
import PreviewTab from "./AgentFormDialog/PreviewTab";

type Props = {
  agents: AgentInfo[];
  setAgents: (agents: AgentInfo[]) => void;
  open: boolean;
  parentid: number;
  parentLVL: number;
  onClose: () => void;
  onSubmit: (data: AgentInfo) => void;
};

export default function CreateAgentFormDialog({
  agents,
  setAgents,
  open,
  parentid,
  parentLVL,
  onClose,
  onSubmit,
}: Props) {
  const [currentTab, setCurrentTab] = useState<"agent" | "user" | "image" | "preview">("agent");
  const [agentInfo, setAgentInfo] = useState<agentInfoType>({
      parent_agent: parentid,
      agent_name: "",
      lvl: parentLVL+1,
      percent: 0,
      url: ""
  })
  const [agentUser, setUserInfo] = useState<agentUserType>({
      email: "",
      name: "",
      passowrd: ""
  })
  const [agentImage, setAgentImage] = useState<agentImageType | null>({
      name: "",
      mimetype: "",
      data: ""
  })
  const [newAgent, setNewAgent] = useState<AgentInfo | null>(null);

  useEffect(() => {
    if (open) {
      // if (defaultValues) {
        // setName(defaultValues.name);
        // setPeriod(defaultValues.period);
        // setTimeUnit(defaultValues.timeUnit);
        // setPrices(defaultValues.prices ?? []);
      // } else {
        // setName("");
        // setPeriod(1);
        // setTimeUnit("day");
        // setPrices([]);
      // }
      setCurrentTab("agent");
    }
  }, [open]);

  // const handleReset = () => {
    // setName(defaultValues?.name ?? "");
    // setPeriod(defaultValues?.period ?? 1);
    // setTimeUnit(defaultValues?.timeUnit ?? "day");
    // setPrices(defaultValues?.prices ?? []);
    // setCurrentTab("agent");
  // };

  const handleCancel = () => {
    // handleReset();
    onClose();
  };

  const handleFinalSubmit = () => {
    // const validationError = validateInsurancePackage({ name, period, timeUnit, prices });
    // if (validationError.length > 0) {
    //   toastValidationErorr(validationError[0]);
    //   return;
    // }

    // onSubmit({
    //   id: defaultValues?.id,
    //   name,
    //   period,
    //   timeUnit,
    //   prices,
    // });

    // handleReset();
    if(newAgent)
      setAgents([...agents, newAgent])
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleCancel()}>
      <DialogContent className="!max-w-2xl !w-full overflow-auto" style={{ maxHeight: "calc(100% - 40px)" }}>
        <DialogHeader>
          <DialogTitle>
            Create Agent
          </DialogTitle>
        </DialogHeader>

        <TabNavigation currentTab={currentTab} onChange={setCurrentTab} />

        <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
          {currentTab === "agent" && (
            <AgentInfoTab
              agentInfo={agentInfo}
              setAgentInfo={setAgentInfo}
              onCancel={handleCancel}
              onNext={() => setCurrentTab("user")}
            />
          )}

          {currentTab === "user" && (
            <UserInfoTab
              agentUser={agentUser}
              setUserInfo={setUserInfo}
              onBack={() => setCurrentTab("agent")}
              onCancel={handleCancel}
              onNext={() => setCurrentTab("image")}
            />
          )}
          {currentTab === "image" && (
            <ImageUploadTab
              agentImage={agentImage}
              setAgentImage={setAgentImage}
              onBack={() => setCurrentTab("user")}
              onCancel={handleCancel}
              onNext={() => setCurrentTab("preview")}
            />
          )}
          {currentTab === "preview" && (
            <PreviewTab
              agentInfo={agentInfo}
              agentUser={agentUser}
              agentImage={agentImage}
              onBack={() => setCurrentTab("image")}
              onCancel={handleCancel}
              onSubmit={handleFinalSubmit}
            />
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// 
