'use client';

import { ReactNode, useEffect, useState } from 'react';
import { PassportFile, ReceiptFile, PersonInfo, InsuranceApplication, Country, BankInfo, PlanWithPrice, InsuranceOrder } from '@/types/all';
import { toastMissingErorr } from '../notifications/toast';
import TrackCodeInput from '../custom/TrackCodeInput';


export default function InsuranceTrackingPage() {


  function fetchOrder(code: string): void {
    // throw new Error('Function not implemented.');
  }

  return (
    <div className="max-w-3xl mx-auto py-2 space-y-6">
        <TrackCodeInput onSubmit={(code) => fetchOrder(code)} />
    </div>
  );
}
