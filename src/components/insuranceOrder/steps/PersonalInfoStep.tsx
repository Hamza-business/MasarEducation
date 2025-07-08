"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Country, PassportFile, PersonInfo } from "@/types/all";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { DateOfBirthPicker } from "@/components/custom/dob";
import { validatePersonalInfo } from "@/components/validations/validatePersonalInfo";

type Props = {
  personInfo: PersonInfo;
  setPersonInfo:  (info: PersonInfo) => void;
  passportFile: PassportFile | null;
  setPassportFile: (file: PassportFile | null) => void;
  onNext: (validate?: () => string[]) => void;
};

export default function PersonalInfoStep({
  personInfo,
  setPersonInfo,
  passportFile,
  setPassportFile,
  onNext,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        <Label>Nationality</Label>
        <Select value={personInfo.nat} onValueChange={(val) => setPersonInfo({ ...personInfo, nat: val as Country })}>
          <SelectTrigger className="w-full mt-1">
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
            value={personInfo.dob}
            onChange={(newDate) => setPersonInfo({ ...personInfo, dob: newDate })}
        />
      </div>

      {/* Passport Upload */}
      <div>
        <Label htmlFor="passport">Passport File</Label>
        <Input
          ref={fileInputRef}
          id="passport"
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleFileChange}
          className="mt-2"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Accepted formats: PDF, PNG, JPG. File is validated using its signature.
        </p>

        {passportFile && (
          <p className="text-sm text-green-600 mt-1">
            ✅ File selected: {passportFile.name}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={()=>{onNext(() => validatePersonalInfo(personInfo, passportFile))}}>Next</Button>
      </div>
    </div>
  );
}
