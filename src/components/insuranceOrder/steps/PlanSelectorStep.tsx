"use client";

import { useState, useEffect } from "react";
import { InsuranceApplication, PersonInfo, PlanWithPrice } from "@/types/all";
import { Button } from "@/components/ui/button";
import { validateInsuranceApplication, validatePackage } from "@/components/validations/validateInsuranceOrder";
import PlanSelector from "../elements/planSelector";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import {useTranslations} from 'next-intl';

type Props = {
  application: InsuranceApplication;
  setApplication: (app: InsuranceApplication) => void;
  availablePlans: PlanWithPrice[];
  setAvailablePlans: (plans: PlanWithPrice[]) => void;
  personInfo: PersonInfo;
  onBack: () => void;
  onNext: (validate?: () => string[]) => void;
  fn: () => void;
};

export default function PlanSelectorStep({ application, setApplication, availablePlans, setAvailablePlans, personInfo, onBack, onNext, fn }: Props) {
  const t = useTranslations("pln");
  
    useEffect(() => {
      fn();
    }, [])

  return (
    <div className="space-y-6">

      <PlanSelector
        availablePlans={availablePlans}
        setAvailablePlans={setAvailablePlans}
        application={application}
        setApplication={setApplication}
        personInfo={personInfo}
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />{t("Back")}</Button>
        <Button onClick={()=>{onNext(() => validatePackage(application))}} className="text-base w-30 h-10">{t("Next")}<GrFormNext /></Button>
      </div>
    </div>
  );
}
