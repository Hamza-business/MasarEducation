'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {OrderDetails} from '@/types/all';
import { InsuranceOrderTable } from '@/components/admin/InsuranceOrdersTable';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';

export default function InsuranceOrders() {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [filtered, setFiltered] = useState<OrderDetails[]>([]);
    
    async function fetchOrders(): Promise<OrderDetails[]> {
        const res = await fetch('/api/orders');
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        fetchOrders().then(data => {
            setOrders(data);
            setFiltered(data);
        });
    }, []);

    return (
        <div>
            <div className='mb-6'>
                <h1 className='text-2xl font-bold'>Insurance Orders</h1>
                <p className='text-muted-foreground text-sm'>Manage Orders</p>
            </div>

            <InsuranceOrderTable orders={orders} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedOrder={setSelectedOrder}/>


            <SlideOver open={open} onClose={() => setOpen(false)} title={`Order #${selectedOrder?.trackcode}`}>
                <OrderSlideOverContent selectedOrder={selectedOrder}/>
            </SlideOver>
        </div>
    );
}
