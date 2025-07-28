'use client';

import { useEffect, useState } from 'react';
import { PassportFile, ReceiptFile, PersonInfo, InsuranceApplication, Country, BankInfo, PlanWithPrice, InsuranceOrder, agentImageType } from '@/types/all';
import PersonalInfoStep from './steps/PersonalInfoStep';
import LivinginformationStep from './steps/LivingInformationStep';
import BankInfoStep from './steps/BankInfoStep';
import ReceiptUploadStep from './steps/ReceiptUploadStep';
import PreviewSubmitStep from './steps/PreviewSubmitStep';
import TrackCodeStep from './steps/trackCodeStep';
import { TbInfoSquareRounded, TbPackages, TbReceipt2 } from 'react-icons/tb';
import { AiTwotoneHome } from "react-icons/ai";
import { GiPassport } from "react-icons/gi";
import { CiBank } from "react-icons/ci";
import { FaFire } from 'react-icons/fa';
import PassportUploadStep from './steps/PassportUploadStep';
import PlanSelectorStep from './steps/PlanSelectorStep';
import { toastMissingErorr } from '../notifications/toast';
import { Container } from '@/app/(site)/container';
import { useParams } from 'next/navigation';
import { fetchAgentByCode, getAgentImageById } from '@/lib/agent';
import { getRegions } from '@/lib/locations';
import {useTranslations} from 'next-intl';

// Constants
const TOTAL_STEPS = 7;

export default function InsuranceOrderingPage() {
  const t = useTranslations("insmngr");
  const [step, setStep] = useState<number>(1);
  const params = useParams();

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
    region: "",
    district: "",
    neighbourhood: "",
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
  const [regions, setRegions] = useState<string[]>([]);
  const [availablePlans, setAvailablePlans] = useState<PlanWithPrice[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [parentid, setParentid] = useState<number>(0);
  const [agentImage, setAgentImage] = useState<agentImageType>();
  
  useEffect(() => {
    fetch("/api/locations/bank-info")
      .then(res => res.json())
      .then(data => setBankInfo(data))
      .catch(err => {});
  }, []);

  useEffect(() => {
      getRegions(setRegions);
  }, []);

    useEffect(() => {
        const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';
        fetchAgentByCode(parent).then(res => {
            if(res.active)
              setParentid(res.id);
            else
              window.location.href = "/insurance";
        }).catch((err)=>{
            window.location.href = "/insurance";
        })
    }, []);

  useEffect(() => {
    setLoaded(false);
    (async ()=>{
      if(parentid && parentid!=1){
          const data = await getAgentImageById(parentid);
          if(data){
              setAgentImage(data);
              setLoaded(true);
          }
      } else if(parentid==1){
          setLoaded(true);
      }
    })()
}, [parentid]);

  const goNext = (validate?: () => string[]) => {
      const errors = validate?.() ?? [];

      if (errors.length > 0) {
          toastMissingErorr(errors[0]);
          return;
      }

      if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
      <Container>
          <div className="max-w-3xl mx-auto py-0 space-y-6 pt-4 pb-4 mt-8 mb-16">
              {/* <div className="w-full">
                {loaded && parentid != 1 && (
                  <img
                    src={`data:${agentImage?.mimetype};base64,${agentImage?.data}`}
                    alt="Banner"
                    className="w-full object-cover rounded-sm min-h-30"
                  />
                )}
                {parentid == 1 && (
                  <img
                    src="/logo.png"
                    alt="Banner"
                    className="w-full object-cover rounded-sm min-h-30"
                  />
                )}
                {!loaded && (
                  <Skeleton className='w-full h-40'/>
                )}
              </div> */}
              <div className="text-center font-semibold text-xl mb-3 flex justify-between items-center">
                <span className='flex justify-center gap-1 items-center text-[#e85f5e]'>
                  {step === 1 && (
                    <>
                      <TbInfoSquareRounded/> {t("pers")}
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <GiPassport /> {t("pssup")}
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <AiTwotoneHome /> {t("lv")}
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <TbPackages /> {t("pkg")}
                    </>
                  )}
                  {step === 5 && (
                    <>
                      <CiBank /> {t("iban")}
                    </>
                  )}
                  {step === 6 && (
                    <>
                      <TbReceipt2 /> {t("rec")}
                    </>
                  )}
                  {step === 7 && (
                    <>
                      <FaFire /> {t("fs")}
                    </>
                  )}
                  {step === 8 && (<>{t("op")}</>)}
                </span>
                <p className="text-center font-semibold text-sm mb-1 text-[#e85f5e]">
                  { step<=TOTAL_STEPS &&(
                    <>
                      {t("Step")} {step} / {TOTAL_STEPS}
                    </>
                  )}
                  { step>TOTAL_STEPS &&(
                    <>
                      {t("fnish")}
                    </>
                  )}
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded overflow-hidden mt-2">
                <div
                  className="bg-[#e85f5e] h-full transition-all duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>

              {step === 1 && (
                <PersonalInfoStep
                  availablePlans={availablePlans}
                  setAvailablePlans={setAvailablePlans}
                  application={application}
                  setApplication={setApplication}
                  personInfo={personInfo}
                  setPersonInfo={setPersonInfo}
                  onNext={goNext}
                />
              )}

              {step === 2 && (
                <PassportUploadStep
                  passportFile={passportFile}
                  setPassportFile={setPassportFile}
                  fn={async ()=>{
                      if(regions.length==0){
                          getRegions(setRegions);
                      }
                  }}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}

              {step === 3 && (
                <LivinginformationStep
                  application={application}
                  regions={regions}
                  setRegions={setRegions}
                  setApplication={setApplication}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}

              {step === 4 && (
                <PlanSelectorStep
                  application={application}
                  setApplication={setApplication}
                  availablePlans={availablePlans}
                  setAvailablePlans={setAvailablePlans}
                  personInfo={personInfo}
                  onBack={goBack}
                  onNext={goNext}
                  fn={async ()=>{
                      if(!bankInfo){
                          fetch("/api/locations/bank-info")
                          .then(res => res.json())
                          .then(data => setBankInfo(data))
                          .catch((error)=>{});
                      }
                  }}
                />
              )}

              {step === 5 && (
                <BankInfoStep
                  bankInfo={bankInfo}
                  setBankInfo={setBankInfo}
                  application={application}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}

              {step === 6 && (
                <ReceiptUploadStep
                  receiptFile={receiptFile}
                  setReceiptFile={setReceiptFile}
                  onBack={goBack}
                  onNext={goNext}
                />
              )}

              {step === 7 && (
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
                  parentid={parentid}
                />
              )}

              {trackCode && step === 8 && (
                <TrackCodeStep
                  trackCode={trackCode}
                />
              )}

          </div>
      </Container>
  );
}
