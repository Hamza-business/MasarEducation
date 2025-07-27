"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ReceiptFile } from "@/types/all";
import ReceiptFileUploadBox from "../elements/receiptUpload";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import { validateReceipt } from "@/components/validations/validateInsuranceOrder";
import {useTranslations} from 'next-intl';

type Props = {
  receiptFile: ReceiptFile | null;
  setReceiptFile: (file: ReceiptFile | null) => void;
  onBack: () => void;
  onNext: (validate?: () => string[]) => void;
};

export default function ReceiptUploadStep({
  receiptFile,
  setReceiptFile,
  onBack,
  onNext,
}: Props) {
  const t = useTranslations("recipUpl");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Step 1: Clear previous file
    setReceiptFile(null);

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
      altoastValidationErorrert(t("inv"));
      return;
    }

    // Step 3: Convert to Base64 and store
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setReceiptFile({
        name: file.name,
        mimetype: file.type,
        data: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-zinc-900 dark:text-gray-200 p-4 rounded-md text-sm text-gray-800">
          {t("tofin")}
        </div>
        <ReceiptFileUploadBox
            receiptFile={receiptFile}
            handleFileChange={handleFileChange}
        />

        {/* Navigation */}
        <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />{t("Back")}</Button>
            <Button onClick={()=>{onNext(() => validateReceipt(receiptFile))}} className="text-base w-30 h-10">{t("Next")}<GrFormNext /></Button>
        </div>
    </div>
  );
}
function altoastValidationErorrert(arg0: string) {
  throw new Error("Function not implemented.");
}

