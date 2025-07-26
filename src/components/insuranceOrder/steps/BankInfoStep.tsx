import { somethingWentWrong } from "@/components/notifications/toast";
import { Button } from "@/components/ui/button";
import { BankInfo } from "@/types/all";
import { InsuranceApplication } from "@/types/all";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "sonner";

type Props = {
  bankInfo: BankInfo | null;
  setBankInfo: (setBankInfo:BankInfo)=> void;
  application: InsuranceApplication;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

export default function BankInfoStep({ bankInfo, setBankInfo, application, onNext, onBack }: Props) {
  const [copied, setCopied] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleCopy = async () => {
        try {
            const data = `
Name
${bankInfo?.name}

Bank
${bankInfo?.bank}

IBAN

Turkish Lira
${bankInfo?.tiban}

Dollars
${bankInfo?.diban}

Euros
${bankInfo?.eiban}

`.trim();
            await navigator.clipboard.writeText(data).then(()=>{
                setCopied(true);
                toast.success("Copied to clipboard!");
            });
        } catch (err) {
            toast.error("Failed to copy.");
        }
  };


  useEffect(() => {
    fetch("/api/bank-info")
    .then(res => res.json())
    .then(data => {
      setBankInfo(data)
      setDisabled(false);
    })
    .catch((error)=>{
      setDisabled(true);
      somethingWentWrong("Failed to load Bank info, Please try again.");
    });
  }, [])

  if (!bankInfo) return <p>Loading bank information...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-zinc-900 dark:text-gray-200 p-4 rounded-md text-sm text-gray-800">
        Complete your insurance by transferring the selected amount{" "}
        <span className="font-semibold text-black text-base">
          {application.price} TL
        </span>{" "}
        to the provided IBAN details below.
      </div>

        <div className="space-y-2">
            <div>
                <h3 className="text-base font-semibold">Name</h3>
                <p>{bankInfo.name}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-base font-semibold">Bank</h3>
                <p>{bankInfo.bank}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-base font-semibold">IBAN</h3>
                <div className="mt-2">
                    <h3 className="text-sm font-semibold text-gray-500">Turkish Lira</h3>
                    <p>{formatIban(bankInfo.tiban)}</p>
                </div>
                <div className="mt-2">
                    <h3 className="text-sm font-semibold text-gray-500">Dollars</h3>
                    <p>{formatIban(bankInfo.diban)}</p>
                </div>
                <div className="mt-2">
                    <h3 className="text-sm font-semibold text-gray-500">Euros</h3>
                    <p>{formatIban(bankInfo.eiban)}</p>
                </div>
            </div>
            <Button variant={"outline"} onClick={!disabled ? handleCopy : ()=>{}} disabled={disabled}><FaRegCopy /> Copy Bank Info</Button>
        </div>
        <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />Back</Button>
            <Button onClick={()=>{onNext()}} className="text-base w-30 h-10">Next<GrFormNext /></Button>
        </div>
    </div>
  );
}
