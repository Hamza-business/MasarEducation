'use client';

import { ReactNode, useEffect, useState } from 'react';
import { InsuranceOrderDetails } from '@/types/all';
import { toastMissingErorr } from '../notifications/toast';
import TrackCodeInput from '../custom/TrackCodeInput';
import OrderDetails from './elements/orderDetails'

export default function InsuranceTrackingPage() {
  const [order, setOrder] = useState<InsuranceOrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrder(trackCode: string) {
    setError(null);
    setOrder(null);
    
    try {
      const res = await fetch(`/api/track-order?code=${trackCode}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Order not found");
        return;
      }

      setOrder(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4">
        <div className="grid gap-6 max-w-2xl">
          {/* <Component /> */}
          <TrackCodeInput onSubmit={fetchOrder} />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {order && <OrderDetails orderdetails={order} />}
        </div>
    </main>
  );
}
