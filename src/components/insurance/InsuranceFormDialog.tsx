"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import PackageInfoTab from "./InsuranceFormTabs/PackageInfoTab";
import PriceRangesTab from "./InsuranceFormTabs/PriceRangesTab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { InsurancePackage, PriceRange } from "@/types/insurance"; // Define these types
import TabNavigation from "./InsuranceFormTabs/TabNavigation";
import {validateInsurancePackage} from "@/components/insurance/validations/validateInsurancePackage";
import { toastValidationErorr } from "../notifications/toast";


type Props = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  defaultValues?: InsurancePackage;
  onSubmit: (data: InsurancePackage & { prices: PriceRange[] }) => void;
};

export default function InsuranceFormDialog({
  open,
  onClose,
  mode,
  defaultValues,
  onSubmit,
}: Props) {
  const [currentTab, setCurrentTab] = useState<"info" | "prices">("info");

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [unit, setUnit] = useState<"day" | "week" | "month" | "year">(defaultValues?.unit ?? "day");
  const [period, setPeriod] = useState(defaultValues?.period ?? 1);
  const [prices, setPrices] = useState<PriceRange[]>(defaultValues?.prices ?? []);

  const handleReset = () => {
    setName(defaultValues?.name ?? "");
    setUnit(defaultValues?.unit ?? "day");
    setPeriod(defaultValues?.period ?? 1);
    setPrices(defaultValues?.prices ?? []);
    setCurrentTab("info");
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const handleFinalSubmit = () => {
   const validationError = validateInsurancePackage({name, unit, period, prices});
    if (validationError.length > 0) {
      toastValidationErorr(validationError[0]);
      return;
    }

    onSubmit({
      id: defaultValues?.id,
      name,
      unit,
      period,
      prices,
    });

    handleReset();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleCancel()}>
      <DialogContent className="!max-w-xl !w-full">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Insurance Package" : "Edit Insurance Package"}
          </DialogTitle>
        </DialogHeader>

        <TabNavigation currentTab={currentTab} onChange={setCurrentTab} />
        
        <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
          {currentTab === "info" && (
            <PackageInfoTab
              name={name}
              unit={unit}
              period={period}
              onChangeName={setName}
              onChangeUnit={setUnit}
              onChangePeriod={setPeriod}
              onCancel={handleCancel}
              onNext={() => setCurrentTab("prices")}
            />
          )}

          {currentTab === "prices" && (
            <PriceRangesTab
              prices={prices}
              setPrices={setPrices}
              onBack={() => setCurrentTab("info")}
              onCancel={handleCancel}
              onSubmit={handleFinalSubmit}
              mode={mode}
            />
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
