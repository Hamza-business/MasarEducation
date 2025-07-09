"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { PersonInfo, InsuranceApplication, PassportFile, ReceiptFile, InsuranceOrder } from "@/types/all";
import { generateUniqueTrackCode, storeApplicationToDB, storeInsuranceOrderToDB, storePersonInfoToDB, uploadPassportToDB, uploadReceiptToDB } from "@/lib/submit";
import { IoChevronBackOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { somethingWentWrong } from "@/components/notifications/toast";

type Props = {
  personInfo: PersonInfo;
  application: InsuranceApplication;
  passportFile: PassportFile | null;
  receiptFile: ReceiptFile | null;
  insuranceOrder: InsuranceOrder;
//   onSubmitSuccess: (trackCode: string) => void;
  step: number;
  setStep: (stp: number) => void;
  setPersonInfo: (info: PersonInfo) => void;
  setInsuranceOrder: (info: any) => void; // Adjust as needed
  setTrackCode: (code: string) => void;
  onBack: () => void;
};

export default function PreviewSubmitStep({
  personInfo,
  application,
  passportFile,
  receiptFile,
  insuranceOrder,
//   onSubmitSuccess,
  step,
  setStep,
  setPersonInfo,
  setInsuranceOrder,
  setTrackCode,
  onBack
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] = useState(false);

  const isValid =
    personInfo.nat &&
    personInfo.dob &&
    personInfo.phone &&
    personInfo.email &&
    personInfo.name &&
    passportFile &&
    application.region &&
    application.district &&
    application.neighbourhood &&
    application.street &&
    application.building &&
    application.appartment &&
    application.plan &&
    application.price &&
    receiptFile;

  const handleSubmit = async () => {
    if (!isValid) {
      alert("Please complete all required steps before submitting.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    setSubmitStep("Generating Track Code");

    try {
        setIsSubmittingDialogOpen(true)
        const trackCode = await generateUniqueTrackCode();
        setTrackCode(trackCode);

        let passportId = personInfo.passport
        if(!passportId){
          setSubmitStep("Uploading Passport");
          passportId = await uploadPassportToDB(passportFile);
        }
        setPersonInfo({ ...personInfo, passport: passportId });


        let receiptId = insuranceOrder.receipt;
        if(!receiptId){
          setSubmitStep("Uploading Receipt");
          receiptId = await uploadReceiptToDB(receiptFile);
        }

        setSubmitStep("Storing Data");
        let personInfoId = insuranceOrder.personInfo;
        if(!personInfoId){
          personInfoId = await storePersonInfoToDB({ ...personInfo, passport: passportId });
        }

        let applicationId = insuranceOrder.insuranceApplication;
        if(!applicationId){
          applicationId = await storeApplicationToDB(application);
        }
        
        const newOrder: InsuranceOrder = {
            trackCode,
            personInfo: personInfoId,
            insuranceApplication: applicationId,
            receipt: receiptId,
        };

        await storeInsuranceOrderToDB(newOrder);

        setInsuranceOrder(newOrder);

        setIsSubmitting(false);
        setStep(step+1);
    } catch (err) {
      setIsSubmittingDialogOpen(false)
      somethingWentWrong("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Submission Preview</h2>

      <ul className="space-y-2">
        {[
          { label: "Personal Info", valid: personInfo.nat && personInfo.dob },
          { label: "Passport Uploaded", valid: passportFile },
          { label: "Insurance Application", valid: application.plan },
          { label: "Receipt Uploaded", valid: receiptFile },
        ].map((step) => (
          <li key={step.label} className="flex items-center gap-2">
            {step.valid ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )}
            <span>{step.label}</span>
          </li>
        ))}
      </ul>

      <Button
        disabled={!isValid || isSubmitting}
        onClick={handleSubmit}
        className="w-full text-base h-11 mb-4"
      > Submit Application<LuSend /> </Button>
      <Button variant="outline" onClick={onBack} className="text-base w-full h-11"><IoChevronBackOutline />Back</Button>

        <Dialog
            open={isSubmittingDialogOpen}
            onOpenChange={setIsSubmittingDialogOpen}
        >
            <DialogContent className="text-center space-y-4 [&>button]:hidden" 
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="mb-0">
                    <DialogTitle className="m-auto text-xl">Submitting Your Insurance Order</DialogTitle>
                </DialogHeader>

                <p className="text-muted-foreground text-lg my-1">
                    {submitStep}
                </p>

                <div className="flex justify-center mb-0">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </DialogContent>
        </Dialog>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-sm text-red-600 text-center mt-4">
          {error}
        </p>
      )}
    </div>
  );
}
