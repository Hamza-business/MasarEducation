'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {OrderDetails} from '@/types/all';
import { InsuranceOrderTable } from '@/components/admin/InsuranceOrdersTable';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';



export async function fetchOrders(): Promise<OrderDetails[]> {
  const res = await fetch('/api/orders'); // Or any API route
  const data = await res.json();
  return data;
}


export default function Page() {
    const [open, setOpen] = useState(false);


    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [filtered, setFiltered] = useState<OrderDetails[]>([]);
    

    useEffect(() => {
        fetchOrders().then(data => {
            setOrders(data);
            setFiltered(data);
        });
    }, []);


    // const orderData = {
    //     id: "1",
    //     trackcode: 'ORD-1234',
    //     status: 'completed',
    //     created_at: '2025-07-14T10:30:00Z',
    //     user: {
    //         name: 'John Doe',
    //         nationality: 'Egyptian',
    //         dob: '1990-05-21',
    //     },
    //     contact: {
    //         email: 'john.doe@example.com',
    //         phone: '+201234567890',
    //     },
    //     plan: {
    //         name: 'Pro Plan',
    //         price: '$49.99',
    //     },
    //     location: {
    //         region: 'Cairo',
    //         district: 'Nasr City',
    //         neighbourhood: 'Zone 6',
    //         street: 'Tayaran Street',
    //         buildingNo: '12B',
    //         apartmentNo: '4A',
    //     },
    //     msg: "sdsdsds",
    // };


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
