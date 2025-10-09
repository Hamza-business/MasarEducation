'use client';

import { ReactNode, useEffect, useState } from 'react';
import { InsuranceOrderDetails } from '@/types/all';
import TrackCodeInput from '../custom/TrackCodeInput';
import OrderDetails from './elements/orderDetails'
import { useOrderTracking } from '@/hooks/useSiteAPIs';
import {useTranslations} from 'next-intl';

export default function InsuranceTrackingPage() {
  const t = useTranslations("trackpage");
  const [trackCode, setTrackCode] = useState<string | null>(null);
  
  // Use SWR hook for order tracking
  const { order, isLoading, error, isRetrying, mutate } = useOrderTracking(trackCode);

  // Handle errors and show appropriate messages
  const errorMessage = error && !isRetrying ? 
    (error.status === 404 ? t("ordnt") : t("smt")) : 
    null;

  async function fetchOrder(code: string) {
    setTrackCode(code);
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-0">
        <div className="grid gap-6 max-w-2xl">
          <TrackCodeInput onSubmit={fetchOrder} />
          
          {/* Show loading state */}
          {isLoading && trackCode && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Loading order details...</p>
            </div>
          )}
          
          {/* Show retry state */}
          {isRetrying && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Retrying...</p>
            </div>
          )}
          
          {/* Show error message */}
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          
          {/* Show order details */}
          {order && <OrderDetails orderdetails={order} />}
        </div>
    </main>
  );
}
