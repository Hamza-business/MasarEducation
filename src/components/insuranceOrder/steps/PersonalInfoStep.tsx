"use client";

import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Country, PassportFile, PersonInfo, PlanWithPrice } from "@/types/all";
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
import FileUploadBox from "../elements/passportUpload";

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
  passportFile: PassportFile | null;
  setPassportFile: (file: PassportFile | null) => void;
  onNext: (validate?: () => string[]) => void;
};

export default function PersonalInfoStep({
  availablePlans,
  setAvailablePlans,
  personInfo,
  setPersonInfo,
  passportFile,
  setPassportFile,
  onNext,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
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

    fetchPlans();
  }, [personInfo.dob]); // Refetch plans when DOB changes

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Step 1: Clear previous file
    setPassportFile(null);

    // Step 2: Read first 4 bytes for magic number signature
    const buffer = await file.slice(0, 4).arrayBuffer();
    const signature = Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const allowedSignatures = {
      pdf: "25504446", // %PDF
      png: "89504E47", // PNG
      jpg: "FFD8FF",   // JPG
    };

    const isValid = Object.values(allowedSignatures).some((sig) =>
      signature.startsWith(sig)
    );

    if (!isValid) {
      alert("Invalid file type. Only PDF, PNG, JPG files are allowed.");
      return;
    }

    // Step 3: Convert to Base64 and store
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setPassportFile({
        name: file.name,
        mimetype: file.type,
        data: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2">Nationality</Label>
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

      {/* Date of Birth */}
      <div>
        <DateOfBirthPicker
            value={personInfo.dob == null ? null :new Date(personInfo.dob)}
            onChange={(newDate) => setPersonInfo({ ...personInfo, dob: newDate })}
        />
      </div>

      {/* Passport Upload */}
      <FileUploadBox
        passportFile={passportFile}
        handleFileChange={handleFileChange}
      />
      

      <div className="flex justify-end">
        <Button onClick={()=>{onNext(() => validatePersonalInfo(personInfo, passportFile))}} className="text-base w-30 h-10">Next<GrFormNext /></Button>
      </div>
    </div>
  );
}
