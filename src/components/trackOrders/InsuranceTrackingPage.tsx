'use client';

import { ReactNode, useEffect, useState } from 'react';
import { InsuranceOrderDetails } from '@/types/all';
import TrackCodeInput from '../custom/TrackCodeInput';
import OrderDetails from './elements/orderDetails'
import {useTranslations} from 'next-intl';

export default function InsuranceTrackingPage() {
  const t = useTranslations("trackpage");
  const [order, setOrder] = useState<InsuranceOrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrder(trackCode: string) {
    setError(null);
    setOrder(null);
    
    try {
      const res = await fetch(`/api/track-order?code=${trackCode}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("ordnt"));
        return;
      }

      setOrder(data);
    } catch (err) {
      console.error(err);
      setError(t("smt"));
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-0">
        <div className="grid gap-6 max-w-2xl">
          <TrackCodeInput onSubmit={fetchOrder} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {order && <OrderDetails orderdetails={order} />}
        </div>
    </main>
  );
}
