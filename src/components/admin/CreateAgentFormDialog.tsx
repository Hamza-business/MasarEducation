"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AgentInfoTab from "./AgentFormDialog/AgentInfoTab";
import UserInfoTab from "./AgentFormDialog/UserInfoTab";
import { Tabs} from "@/components/ui/tabs";
import type { AgentInfo, InsurancePackage, PriceRange } from "@/types/all";
import TabNavigation from "./AgentFormDialog/TabNavigation";
import { validateInsurancePackage } from "@/components/validations/validateInsurancePackage";
import { toastValidationErorr } from "../notifications/toast";
import ImageUploadTab from "./AgentFormDialog/ImageUploadTab";

type Props = {
  open: boolean;
  parentid: number;
  onClose: () => void;
  onSubmit: (data: AgentInfo) => void;
};

export default function CreateAgentFormDialog({
  open,
  parentid,
  onClose,
  onSubmit,
}: Props) {
  const [currentTab, setCurrentTab] = useState<"agent" | "user" | "image">("agent");
  const [newAgent, setNewAgent] = useState<AgentInfo>({
    id: 0,
    agent_name: "",
    lvl: 0,
    percent: 0,
    url: "",
    active: true,
    created_at: "",

    user: {
        id: 0,
        email: "",
        name: "",
        created_at: "",
    },

    image: {
        id: 0,
        name: "",
        mimetype: "",
        data: "",
    },
  });

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
    // onClose();
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
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleCancel()}>
      <DialogContent className="!max-w-xl !w-full overflow-auto" style={{ maxHeight: "calc(100% - 40px)" }}>
        <DialogHeader>
          <DialogTitle>
            Create Agent
          </DialogTitle>
        </DialogHeader>

        <TabNavigation currentTab={currentTab} onChange={setCurrentTab} />

        <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
          {currentTab === "agent" && (
            <AgentInfoTab
              onCancel={handleCancel}
              onNext={() => setCurrentTab("user")}
            />
          )}

          {currentTab === "user" && (
            <UserInfoTab
              onBack={() => setCurrentTab("agent")}
              onCancel={handleCancel}
              onNext={() => setCurrentTab("image")}
            />
          )}
          {currentTab === "image" && (
            <ImageUploadTab
              onBack={() => setCurrentTab("user")}
              onCancel={handleCancel}
              onSubmit={handleFinalSubmit}
            />
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
