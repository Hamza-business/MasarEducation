'use client';

import { useState } from 'react';
import { OrderDetails } from '@/types/all';
import { Button } from '@/components/ui/button';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import SlideOver from '@/components/admin/SlideOver';
import { InsuranceOrderTable } from '@/components/admin/InsuranceOrdersTable';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';
import { exportToExcel, fetchAgentOrders } from '@/lib/exportData';

interface InsuranceOrdersSectionProps {
  agentName: string;
  parentid: number;
  orders: OrderDetails[] | undefined;
  isLoading: boolean;
  error: string | null;
}

export function InsuranceOrdersSection({
  agentName,
  parentid,
  orders,
  isLoading,
  error,
}: InsuranceOrdersSectionProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);

  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await fetchAgentOrders(parentid);
      exportToExcel(data, `agents_orders_${agentName}`);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Insurance Orders</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Manage{' '}
          <span className="font-semibold text-zinc-600 dark:text-gray-300">
            {agentName}&#39;
          </span>
          s Insurance Orders
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error loading orders: {error}
        </div>
      )}

      <Button
        onClick={handleExport}
        disabled={loading}
        className="bg-[#1f9d61] hover:bg-[#1f9d61] text-white flex items-center gap-2 mb-2"
      >
        <PiMicrosoftExcelLogo className="text-white text-lg" />
        {loading ? 'Fetching...' : 'Export Orders'}
      </Button>

      <InsuranceOrderTable 
        orders={orders || []} 
        setOpen={setOpen} 
        setSelectedOrder={setSelectedOrder}
      />

      <SlideOver 
        open={open} 
        onClose={() => setOpen(false)} 
        title={`Order #${selectedOrder?.trackcode}`}
      >
        <OrderSlideOverContent selectedOrder={selectedOrder} />
      </SlideOver>
    </div>
  );
}
