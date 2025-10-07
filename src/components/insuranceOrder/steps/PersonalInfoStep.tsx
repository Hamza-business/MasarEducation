"use client";

import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Country, InsuranceApplication, PassportFile, PersonInfo, PlanWithPrice } from "@/types/all";
import { GrFormNext } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateOfBirthPicker } from "@/components/custom/dob";
import { validatePersonalInfo } from "@/components/validations/validateInsuranceOrder";
import { Input } from "@/components/ui/input";
import { useInsurancePlans } from "@/hooks/useSiteAPIs";
import { planFetchFailed } from "@/components/notifications/toast";
import {useTranslations} from 'next-intl';

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
  availablePlans: PlanWithPrice[];
  personInfo: PersonInfo;
  setAvailablePlans: (plans: PlanWithPrice[]) => void;
  setPersonInfo: (info: PersonInfo) => void;
  application: InsuranceApplication;
  setApplication: (data: InsuranceApplication) => void;
  onNext: (validate?: () => string[]) => void;
};

export default function PersonalInfoStep({
  availablePlans,
  setAvailablePlans,
  personInfo,
  setPersonInfo,
  application,
  setApplication,
  onNext,
}: Props) {
  const t = useTranslations("perinfo");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Calculate age from DOB
  const age = personInfo.dob ? calculateAge(personInfo.dob) : null;
  
  // Use SWR hook for insurance plans
  const { plans, isLoading, error, isRetrying } = useInsurancePlans(age);

  // Update available plans when SWR data changes
  useEffect(() => {
    if (plans) {
      setAvailablePlans(plans);
      // Reset selected plan when new plans are loaded
      setApplication({...application, plan: "", price: null});
    }
  }, [plans, setAvailablePlans, setApplication, application]);

  // Handle errors - only show toast after all retries failed
  useEffect(() => {
    if (error && !isRetrying && age !== null) {
      console.error('Failed to fetch insurance plans after all retries:', error);
      planFetchFailed();
    }
  }, [error, isRetrying, age]);

  return (
    <div className="space-y-6">
      <div>
          <Label className="mb-2">{t("fn")} *</Label>
          <Input
            value={personInfo.name || ""}
            onChange={(e) =>
              setPersonInfo({ ...personInfo, name: e.target.value })
            }
            placeholder={t("efn")}
          />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-2">{t("email")} *</Label>
          <Input
            type="email"
            value={personInfo.email || ""}
            onChange={(e) =>
              setPersonInfo({ ...personInfo, email: e.target.value })
            }
            placeholder={t("eemail")}
          />
        </div>
        <div>
          <Label className="mb-2">{t("phn")} *</Label>
          <Input
            type="tel"
            inputMode="numeric"
            value={personInfo.phone || ""}
            onChange={(e) =>
              setPersonInfo({ ...personInfo, phone: e.target.value })
            }
            placeholder={t("ephn")}
          />
        </div>
      </div>
      <div>
        <Label className="mb-2">{t("nat")} *</Label>
        <Select value={personInfo.nat} onValueChange={(val) => setPersonInfo({ ...personInfo, nat: val as Country })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Country).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <DateOfBirthPicker
            value={personInfo.dob == null ? null :new Date(personInfo.dob)}
            onChange={(newDate) => {
              setAvailablePlans([]);
              setPersonInfo({ ...personInfo, dob: newDate })
              setApplication({...application, plan: "", price: null})
            }}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={()=>{onNext(() => validatePersonalInfo(personInfo))}} className="text-base w-30 h-10">{t("Next")}<GrFormNext /></Button>
      </div>
    </div>
  );
}
