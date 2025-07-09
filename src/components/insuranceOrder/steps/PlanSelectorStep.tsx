"use client";

import { useState, useEffect } from "react";
import { InsuranceApplication, PersonInfo, PlanWithPrice } from "@/types/all";
import { Button } from "@/components/ui/button";
import { validateInsuranceApplication, validatePackage } from "@/components/validations/validateInsuranceOrder";
import PlanSelector from "../elements/planSelector";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";


function calculateAge(dob: Date): number {
  const now = new Date();
  const birthDate = new Date(dob);
  let age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}


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

    useEffect(() => {
      fn();
    }, [])

    useEffect(() => {
      const fetchPlans = async () => {
          setApplication({...application, plan: "", price: null})
          if (!personInfo.dob) return;
  
          const age = calculateAge(personInfo.dob); // Implement this function
          const res = await fetch(`/api/insurances/plans-with-prices?age=${age}`);
  
          if (!res.ok) {
          console.error("Failed to fetch plans");
          return;
          }
  
          const data: PlanWithPrice[] = await res.json();
          setAvailablePlans(data);
      };

      if(availablePlans.length==0){
        fetchPlans();
      }
    }, [personInfo.dob]); // Refetch plans when DOB changes

  return (
    <div className="space-y-6">

      <PlanSelector
        plans={availablePlans}
        application={application}
        setApplication={setApplication}
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />Back</Button>
        <Button onClick={()=>{onNext(() => validatePackage(application))}} className="text-base w-30 h-10">Next<GrFormNext /></Button>
      </div>
    </div>
  );
}
