import { somethingWentWrong } from "@/components/notifications/toast";
import { Button } from "@/components/ui/button";
import { BankInfo } from "@/types/all";
import { InsuranceApplication } from "@/types/all";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useBankInfo } from "@/hooks/useSiteAPIs";
import {useTranslations} from 'next-intl';
import { LuCopy } from "react-icons/lu";

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
  const t = useTranslations("bninfo");
  const [copied, setCopied] = useState(false);
  
  // Use SWR hook for bank info
  const { bankInfo: swrBankInfo, isLoading, error, isRetrying } = useBankInfo();

  // Use SWR bank info if available, otherwise fall back to props
  const currentBankInfo = swrBankInfo || bankInfo;

  const name = `
Name
${currentBankInfo?.name}
`

  const bank = `
Bank
${currentBankInfo?.bank}
`

  const turkeyLira = `
Turkish Lira IBAN
${currentBankInfo?.tiban}  
`
  const dollars = `
Dollars IBAN
${currentBankInfo?.diban}
`
  const euros = `
Euros IBAN
${currentBankInfo?.eiban}
`

  const copyall = `
Name
${currentBankInfo?.name}

Bank
${currentBankInfo?.bank}

IBAN

Turkish Lira
${currentBankInfo?.tiban}

Dollars
${currentBankInfo?.diban}

Euros
${currentBankInfo?.eiban}
`

  const handleCopy = async (msg:string) => {
        try {
            const data = msg.trim();
            await navigator.clipboard.writeText(data).then(()=>{
                setCopied(true);
                toast.success("Copied to clipboard!");
            });
        } catch (err) {
            toast.error("Failed to copy.");
        }
  };


  // Update parent component when SWR data changes
  useEffect(() => {
    if (swrBankInfo) {
      setBankInfo(swrBankInfo);
    }
  }, [swrBankInfo, setBankInfo]);

  // Handle errors - only show toast after all retries failed
  useEffect(() => {
    if (error && !isRetrying) {
      console.error('Failed to fetch bank info after all retries:', error);
      somethingWentWrong("Failed to load Bank info, Please try again.");
    }
  }, [error, isRetrying]);

  // Show loading state
  if (isLoading || isRetrying) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">{isRetrying ? "Retrying..." : t("load")}</p>
        </div>
      </div>
    );
  }

  if (!currentBankInfo) return <p>{t("load")}</p>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-zinc-900 dark:text-gray-200 p-4 rounded-md text-sm text-gray-800">
        {t("comp")}{" "}
        <span className="font-semibold text-black text-base">
          {application.price} TL
        </span>{" "}
        {t("to")}
      </div>

        <div className="space-y-2">
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Name</h3>
                    <Button variant={"ghost"} onClick={()=>{handleCopy(name)}}><LuCopy /></Button>
                </div>
                <p>{currentBankInfo.name}</p>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Bank</h3>
                    <Button variant={"ghost"} onClick={()=>{handleCopy(bank)}}><LuCopy /></Button>
                </div>
                <p>{currentBankInfo.bank}</p>
            </div>
            <div className="mt-4">
                <h3 className="text-base font-semibold">IBAN</h3>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-500">Turkish Lira</h3>
                        <Button variant={"ghost"} onClick={()=>{handleCopy(turkeyLira)}}><LuCopy /></Button>
                    </div>
                    <p>{formatIban(currentBankInfo.tiban)}</p>
                </div>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-500">Dollars</h3>
                        <Button variant={"ghost"} onClick={()=>{handleCopy(dollars)}}><LuCopy /></Button>
                    </div>
                    <p>{formatIban(currentBankInfo.diban)}</p>
                </div>
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-500">Euros</h3>
                        <Button variant={"ghost"} onClick={()=>{handleCopy(euros)}}><LuCopy /></Button>
                    </div>
                    <p>{formatIban(currentBankInfo.eiban)}</p>
                </div>
            </div>
            <Button variant={"outline"} onClick={()=>{handleCopy(copyall)}}><FaRegCopy /> {t("copy")}</Button>
        </div>
        <div className="flex justify-between">
            <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />{t("Back")}</Button>
            <Button onClick={()=>{onNext()}} className="text-base w-30 h-10">{t("Next")}<GrFormNext /></Button>
        </div>
    </div>
  );
}
