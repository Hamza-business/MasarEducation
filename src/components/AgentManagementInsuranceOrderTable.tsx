'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {OrderDetails} from '@/types/all';
import { InsuranceOrderTable } from '@/components/admin/InsuranceOrdersTable';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';
import { useParams } from 'next/navigation';
import { fetchAgentByCode } from '@/lib/agent';
import { exportToExcel, fetchAgentOrders } from '@/lib/exportData';
import { useAgentOrders } from '@/hooks/useSiteAPIs';
import { Button } from '@/components/ui/button';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function AgentManagementInsuranceOrderTable() {
    const params = useParams();
    const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';
    const [loading, setLoading] = useState(false);

    const [parentid, setParentid] = useState<number>(0);
    const [parentLVL, setParentLVL] = useState<number>(3);
    const [agentName, setAgentName] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [filtered, setFiltered] = useState<OrderDetails[]>([]);
    
    // Use SWR hook for agent orders
    const { orders, isLoading: ordersLoading, error: ordersError, isRetrying: ordersRetrying } = useAgentOrders(parentid);

    useEffect(() => {
        fetchAgentByCode(parent).then(res => {
            setParentid(res.id);
            setParentLVL(res.lvl);
            setAgentName(res.agent_name);
        });
    }, []);

    // Update filtered orders when orders change
    useEffect(() => {
        if (orders) {
            setFiltered(orders);
        }
    }, [orders]);

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
            <div className='mb-6'>
                <h1 className='text-2xl font-bold'>Insurance Orders</h1>
                <p className='text-muted-foreground text-sm mt-0.5'>Manage <span className='font-semibold text-zinc-600 dark:text-gray-300'>{agentName}&#39;</span>s Insurance Orders</p>
            </div>

            <Button
                onClick={handleExport}
                disabled={loading}
                className="bg-[#1f9d61] hover:bg-[#1f9d61] text-white flex items-center gap-2 mb-2"
            >
                <PiMicrosoftExcelLogo className="text-white text-lg" />
                {loading ? 'Fetching...' : 'Export Orders'}
            </Button>

            <InsuranceOrderTable orders={orders || []} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedOrder={setSelectedOrder}/>

            <SlideOver open={open} onClose={() => setOpen(false)} title={`Order #${selectedOrder?.trackcode}`}>
                <OrderSlideOverContent selectedOrder={selectedOrder}/>
            </SlideOver>
        </div>
    );
}
