'use client';

import { useEffect, useState } from 'react';
import {OrderDetails} from '@/types/all';
import { useParams } from 'next/navigation';
import { fetchAgentByCode } from '@/lib/agent';
import { InsuranceOrderTableAgent } from '@/components/admin/InsuranceOrdersTableAgent';
import { Button } from '@/components/ui/button';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { exportToExcel, fetchAgentOrders } from '@/lib/exportData';

export default function InsuranceOrders() {
    const params = useParams();
    const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';
    const [loading, setLoading] = useState(false);

    const [parentid, setParentid] = useState<number>(0);
    const [parentLVL, setParentLVL] = useState<number>(3);
    const [agentName, setAgentName] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [filtered, setFiltered] = useState<OrderDetails[]>([]);
    
    async function fetchOrders(): Promise<OrderDetails[]> {
        const res = await fetch(`/api/orders?agentId=${parentid}`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        fetchAgentByCode(parent).then(res => {
            setParentid(res.id);
            setParentLVL(res.lvl);
            setAgentName(res.agent_name);
        });
    }, []);

    useEffect(() => {
        if (parentid !== 0) {
            fetchOrders().then(data => {
                setOrders(data);
                setFiltered(data);
            });
        }
    }, [parentid]);

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

            <InsuranceOrderTableAgent orders={orders} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedOrder={setSelectedOrder}/>
        </div>
    );
}
