import { Button } from "@/components/ui/button";
import { BankInfo } from "@/types/all";
import { InsuranceApplication } from "@/types/all";

type Props = {
  bankInfo: BankInfo | null;
  application: InsuranceApplication;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}

export default function BankInfoStep({ bankInfo, application, onNext, onBack }: Props) {
  if (!bankInfo) return <p>Loading bank information...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md text-sm text-gray-800">
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
        </div>
        <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>Back</Button>
            <Button onClick={()=>{onNext()}}>Next</Button>
        </div>
    </div>
  );
}
