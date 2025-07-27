"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { PersonInfo, InsuranceApplication, PassportFile, ReceiptFile, InsuranceOrder } from "@/types/all";
import { generateUniqueTrackCode, storeApplicationToDB, storeInsuranceOrderToDB, storePersonInfoToDB, uploadPassportToDB, uploadReceiptToDB } from "@/lib/submit";
import { IoChevronBackOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { somethingWentWrong, toastMissingErorr } from "@/components/notifications/toast";
import { orderReceivedEmail, sendOrderRecievedEmail } from "@/lib/emails";
import {useTranslations} from 'next-intl';

type Props = {
  personInfo: PersonInfo;
  application: InsuranceApplication;
  passportFile: PassportFile | null;
  receiptFile: ReceiptFile | null;
  insuranceOrder: InsuranceOrder;
//   onSubmitSuccess: (trackCode: string) => void;
  step: number;
  parentid: number;
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
  step,
  parentid,
  setStep,
  setPersonInfo,
  setInsuranceOrder,
  setTrackCode,
  onBack
}: Props) {
  const t = useTranslations("prevSub");

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
    application.region != "" &&
    application.district != "" &&
    application.neighbourhood != "" &&
    application.street &&
    application.building &&
    application.appartment &&
    application.plan &&
    application.price &&
    receiptFile;

  const handleSubmit = async () => {
    if (!isValid) {
      toastMissingErorr(t("errcomp"));
      return;
    }

    setError(null);
    setIsSubmitting(true);
    setSubmitStep(t("gen"));

    try {
        setIsSubmittingDialogOpen(true)
        const trackCode = await generateUniqueTrackCode();
        setTrackCode(trackCode);

        let passportId = personInfo.passport
        if(!passportId){
          setSubmitStep(t("upps"));
          passportId = await uploadPassportToDB(passportFile);
        }
        setPersonInfo({ ...personInfo, passport: passportId });


        let receiptId = insuranceOrder.receipt;
        if(!receiptId){
          setSubmitStep(t("uprec"));
          receiptId = await uploadReceiptToDB(receiptFile);
        }

        setSubmitStep(t("storD"));
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

        await storeInsuranceOrderToDB(newOrder, parentid.toString());

        setInsuranceOrder(newOrder);

        setIsSubmitting(false);
        setStep(step+1);
        sendOrderRecievedEmail(personInfo.email, personInfo.name, trackCode);
        orderReceivedEmail("support@masartr.com", trackCode);
    } catch (err) {
      setIsSubmittingDialogOpen(false)
      setError(t("err"));
      somethingWentWrong(t("err"));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("subpre")}</h2>

      <ul className="space-y-2">
        {[
          { label: t("psin"), valid: personInfo.nat && personInfo.dob },
          { label: t("psupload"), valid: passportFile },
          { label: t("insapplic"), valid: application.plan },
          { label: t("recpupload"), valid: receiptFile },
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
      > {t("sub")}<LuSend /> </Button>
      <Button variant="outline" onClick={onBack} className="text-base w-full h-11"><IoChevronBackOutline />{t("Back")}</Button>

        <Dialog
            open={isSubmittingDialogOpen}
            onOpenChange={setIsSubmittingDialogOpen}
        >
            <DialogContent className="text-center space-y-4 [&>button]:hidden" 
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="mb-0">
                    <DialogTitle className="m-auto text-xl">{t("subinsur")}</DialogTitle>
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
        <p className="text-base text-red-600 text-center mt-0">
          {error}
        </p>
      )}
    </div>
  );
}
