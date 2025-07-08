'use client';

import { useState } from 'react';
import { PassportFile, ReceiptFile, PersonInfo, InsuranceApplication, Country } from '@/types/all';
import PersonalInfoStep from './steps/PersonalInfoStep';
import InsuranceApplicationStep from './steps/InsuranceApplicationStep';

// Constants
const TOTAL_STEPS = 5;

export default function InsuranceOrderingPage() {
  const [step, setStep] = useState(2);

  // Shared state across steps
  const [personInfo, setPersonInfo] = useState<PersonInfo | any>({
    nat: Country.Turkey,
    dob: null,
    passport: 0,
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

    const goNext = (validate?: () => string[]) => {
        const errors = validate?.() ?? [];

        if (errors.length > 0) {
            alert(errors.join("\n")); // You can use a toast instead
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
          personInfo={personInfo}
          setPersonInfo={setPersonInfo}
          passportFile={passportFile}
          setPassportFile={setPassportFile}
          onNext={goNext}
        />
      )}

      {step === 2 && (
        <InsuranceApplicationStep
          application={application}
          setApplication={setApplication}
          onBack={goBack}
          onNext={goNext}
        />
      )}
      {/* validateInsuranceApplication(application) */}
      {/* Conditional rendering of each step

      {step === 3 && (
        <BankInfoStep
          back={goBack}
          next={goNext}
        />
      )}

      {step === 4 && (
        <ReceiptUploadStep
          passportFile={passportFile}
          receiptFile={receiptFile}
          setPassportFile={setPassportFile}
          setReceiptFile={setReceiptFile}
          back={goBack}
          next={goNext}
        />
      )}

      {step === 5 && (
        <SubmitStep
          personInfo={personInfo}
          application={application}
          passportFile={passportFile}
          receiptFile={receiptFile}
          setTrackCode={setTrackCode}
          back={goBack}
        />
      )}

      {trackCode && (
        <div className="mt-6 p-4 border rounded text-center bg-green-100 text-green-900">
          ✅ Track Code: <strong>{trackCode}</strong>
        </div>
      )} */}
    </div>
  );
}
