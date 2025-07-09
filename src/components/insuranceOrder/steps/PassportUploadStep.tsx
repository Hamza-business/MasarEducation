"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PassportFile } from "@/types/all";
import { GrFormNext } from "react-icons/gr";
import { validatePassport } from "@/components/validations/validateInsuranceOrder";
import FileUploadBox from "../elements/passportUpload";
import { IoChevronBackOutline } from "react-icons/io5";
import { toastValidationErorr } from "@/components/notifications/toast";

type Props = {
  passportFile: PassportFile | null;
  setPassportFile: (file: PassportFile | null) => void;
  fn: () => void;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

export default function PassportUploadStep({
  passportFile,
  setPassportFile,
  fn,
  onNext,
  onBack
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fn();
  }, [])

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
      toastValidationErorr("Invalid file type. Only PDF, PNG, JPG files are allowed.");
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
      <FileUploadBox
        passportFile={passportFile}
        handleFileChange={handleFileChange}
      />
      

      <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />Back</Button>
          <Button onClick={()=>{onNext(() => validatePassport(passportFile))}} className="text-base w-30 h-10">Next<GrFormNext /></Button>
      </div>
    </div>
  );
}
