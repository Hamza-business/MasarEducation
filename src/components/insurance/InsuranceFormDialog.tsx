"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import PackageInfoTab from "./InsuranceFormTabs/PackageInfoTab";
import PriceRangesTab from "./InsuranceFormTabs/PriceRangesTab";
import { Tabs} from "@/components/ui/tabs";
import type { InsurancePackage, PriceRange } from "@/types/insurance";
import TabNavigation from "./InsuranceFormTabs/TabNavigation";
import { validateInsurancePackage } from "@/components/insurance/validations/validateInsurancePackage";
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

  const [name, setName] = useState("");
  const [period, setPeriod] = useState<number>(1);
  const [timeUnit, setTimeUnit] = useState<"day" | "week" | "month" | "year">("day");
  const [prices, setPrices] = useState<PriceRange[]>([]);

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        setName(defaultValues.name);
        setPeriod(defaultValues.period);
        setTimeUnit(defaultValues.timeUnit);
        setPrices(defaultValues.prices ?? []);
      } else {
        setName("");
        setPeriod(1);
        setTimeUnit("day");
        setPrices([]);
      }
      setCurrentTab("info");
    }
  }, [open, defaultValues]);

  const handleReset = () => {
    setName(defaultValues?.name ?? "");
    setPeriod(defaultValues?.period ?? 1);
    setTimeUnit(defaultValues?.timeUnit ?? "day");
    setPrices(defaultValues?.prices ?? []);
    setCurrentTab("info");
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const handleFinalSubmit = () => {
    const validationError = validateInsurancePackage({ name, period, timeUnit, prices });
    if (validationError.length > 0) {
      toastValidationErorr(validationError[0]);
      return;
    }

    onSubmit({
      id: defaultValues?.id,
      name,
      period,
      timeUnit,
      prices,
    });

    handleReset();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleCancel()}>
      <DialogContent className="!max-w-xl !w-full">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Insurance Plan" : "Edit Insurance Package"}
          </DialogTitle>
        </DialogHeader>

        <TabNavigation currentTab={currentTab} onChange={setCurrentTab} />

        <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
          {currentTab === "info" && (
            <PackageInfoTab
              name={name}
              period={period}
              timeUnit={timeUnit}
              onChangeName={setName}
              onChangePeriod={setPeriod}
              onChangeTimeUnit={setTimeUnit}
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
