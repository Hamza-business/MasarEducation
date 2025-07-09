'use client';

import { useEffect, useState } from 'react';
import { PassportFile, ReceiptFile, PersonInfo, InsuranceApplication, Country, BankInfo, PlanWithPrice, InsuranceOrder } from '@/types/all';
import PersonalInfoStep from './steps/PersonalInfoStep';
import InsuranceApplicationStep from './steps/InsuranceApplicationStep';
import BankInfoStep from './steps/BankInfoStep';
import ReceiptUploadStep from './steps/ReceiptUploadStep';
import PreviewSubmitStep from './steps/PreviewSubmitStep';
import { Button } from '../ui/button';
import { TbProgressCheck } from 'react-icons/tb';
import { FaLocationArrow } from 'react-icons/fa';

// Constants
const TOTAL_STEPS = 6;

export default function InsuranceOrderingPage() {
  const [step, setStep] = useState(1);

  // Shared state across steps
  const [insuranceOrder, setInsuranceOrder] = useState<InsuranceOrder>({
    trackCode: "",
    personInfo: 0,
    insuranceApplication: 0,
    receipt: 0
  });
  const [personInfo, setPersonInfo] = useState<PersonInfo | any>({
    nat: Country.Turkey,
    dob: null,
    passport: 0,
    name: "",
    email: "",
    phone: ""
  });
  const [application, setApplication] = useState<InsuranceApplication>({
    region: null,
    district: null,
    neighbourhood: null,
    street: "",
    building: "",
    appartment: "",
    plan: "",
    price: null
  });
  const [passportFile, setPassportFile] = useState<PassportFile | null>(null);
  const [receiptFile, setReceiptFile] = useState<ReceiptFile | null>(null);
  const [trackCode, setTrackCode] = useState<string | null>(null);
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [availablePlans, setAvailablePlans] = useState<PlanWithPrice[]>([]);
  

  useEffect(() => {
    fetch("/api/bank-info")
      .then(res => res.json())
      .then(data => setBankInfo(data))
      .catch(err => console.error("Failed to load bank info", err));
  }, []);

  useEffect(() => {
    fetch("/api/regions")
      .then((res) => res.json())
      .then(setRegions)
      .catch(console.error);
  }, []);

  const goNext = (validate?: () => string[]) => {
      const errors = validate?.() ?? [];

      if (errors.length > 0) {
          alert(errors.join("\n"));
          return;
      }

      if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      {/* Optional: Step indicator */}
      <div className="text-center font-semibold text-lg">
        Step {step} of {TOTAL_STEPS}
      </div>

      {step === 1 && (
        <PersonalInfoStep
          availablePlans={availablePlans}
          setAvailablePlans={setAvailablePlans}
          application={application}
          setApplication={setApplication}
          personInfo={personInfo}
          setPersonInfo={setPersonInfo}
          passportFile={passportFile}
          setPassportFile={setPassportFile}
          onNext={goNext}
        />
      )}

      {step === 2 && (
        <InsuranceApplicationStep
          personInfo={personInfo}
          application={application}
          regions={regions}
          availablePlans={availablePlans}
          setApplication={setApplication}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {step === 3 && (
        <BankInfoStep
          bankInfo={bankInfo}
          application={application}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {step === 4 && (
        <ReceiptUploadStep
          receiptFile={receiptFile}
          setReceiptFile={setReceiptFile}
          onBack={goBack}
          onNext={goNext}
        />
      )}

      {step === 5 && (
        <PreviewSubmitStep
          personInfo={personInfo}
          application={application}
          passportFile={passportFile}
          receiptFile={receiptFile}
          insuranceOrder={insuranceOrder}
          setInsuranceOrder={setInsuranceOrder}
          setPersonInfo={setPersonInfo}
          setTrackCode={setTrackCode}
          onBack={goBack}
          step={step}
          setStep={setStep}
        />
      )}

      {trackCode && step === 6 && (
        <div className="mt-10 p-6 border border-blue-400 bg-blue-50 dark:bg-gray-900 dark:border-blue-400 rounded-sm text-center shadow-sm space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold">
            🎉 Your Insurance Order Has Been Submitted!
          </h2>
          <p className="text-xl px-4 font-semibold">
            This is your tracking code:
          </p>

          <div className="text-5xl font-mono font-bold tracking-widest">
            {trackCode}
          </div>

          <p className="text-base px-4">
            Please keep it safe – you’ll need it to check your insurance status or claim it.
          </p>
          

          <Button className='text-base px-5 py-6 mt-2'>
            <a href="/track" className='flex justify-between items-center gap-2'><TbProgressCheck /> Track Your Order <FaLocationArrow /></a>
          </Button>

          
        </div>
      )}

    </div>
  );
}
