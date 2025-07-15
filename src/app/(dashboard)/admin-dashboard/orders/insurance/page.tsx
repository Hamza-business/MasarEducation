'use client';

import { useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PiUserListDuotone } from 'react-icons/pi';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { oredrStatus } from '@/types/all';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import { IoMdArrowDropright } from 'react-icons/io';
import { TbSettings2 } from 'react-icons/tb';

const statusMap: Record<oredrStatus, { label: string; color: string, stl:string}> = {
  "pending": { label: "Pending", color: "bg-gray-300 text-gray-700", stl:"bg-gray-200 text-gray-800 border-gray-500"},
  "under review": { label: "Under Review", color: "bg-yellow-100 text-yellow-900", stl:"bg-yellow-100 text-yellow-800 border-yellow-500"},
  "completed": { label: "Completed", color: "bg-green-200 text-green-800", stl:"bg-green-100 text-green-800 border-green-800"},
  "rejected": { label: "Rejected", color: "bg-red-200 text-red-800", stl:"bg-red-100 text-red-800 border-red-500"},
};

function convertDate(dt:Timestamp|Date|string):string{
    const issuedDate = new Date(dt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return issuedDate;
}


export default function Page() {
    const [open, setOpen] = useState(false);

    const orderData = {
        id: "1",
        trackcode: 'ORD-1234',
        status: 'completed',
        created_at: '2025-07-14T10:30:00Z',
        user: {
            name: 'John Doe',
            nationality: 'Egyptian',
            dob: '1990-05-21',
        },
        contact: {
            email: 'john.doe@example.com',
            phone: '+201234567890',
        },
        plan: {
            name: 'Pro Plan',
            price: '$49.99',
        },
        location: {
            region: 'Cairo',
            district: 'Nasr City',
            neighbourhood: 'Zone 6',
            street: 'Tayaran Street',
            buildingNo: '12B',
            apartmentNo: '4A',
        },
        msg: "sdsdsds",
    };



    return (
        <div className="p-6">
            <Button onClick={() => setOpen(true)}>View Order Details</Button>

            <SlideOver open={open} onClose={() => setOpen(false)} title={`Order #${orderData.trackcode}`}>
                {/* Top Actions */}
                <div className="flex gap-3 mb-4 justify-end">
                    <a href={`/orders/insurance/${orderData.trackcode}/manage`} className="cursor-pointer">
                        <Button className="cursor-pointer"><TbSettings2 /> Manage Order <IoMdArrowDropright /></Button>
                    </a>
                </div>

                {/* Order Status */}
                <div className="mb-4 flex items-center gap-2 justify-between">
                    <div>
                        <span
                            className={cn(
                                'px-3 py-1 rounded-sm text-sm font-medium',
                                statusMap[orderData.status as oredrStatus].color
                            )}
                        >{statusMap[orderData.status as oredrStatus].label}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Order Issued on</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{convertDate(orderData?.created_at)}</span>
                    </div>
                </div>
                
                {(orderData.status as oredrStatus === "rejected") && (
                    <>
                        <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>Reject Message</span>
                        <div className="mt-2 bg-red-50 dark:bg-neutral-800 dark:text-red-400 p-4 rounded-sm text-sm text-gray-800 border border-red-300 dark:border-red-500">
                            {orderData?.msg}
                        </div>
                    </>
                )}

                {/* User + Contact/Location in Grid */}
                <div className="mb-8 mt-8 border-b pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 relative">
                        {/* Vertical divider */}
                        <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gray-200 dark:bg-zinc-700" />

                        {/* User Info */}
                        <div className="pl-3 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <PiUserListDuotone className='w-6 h-6' /> User Information
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <p><strong>Name:</strong> {orderData.user.name}</p>
                                    <p><strong>Nationality:</strong> {orderData.user.nationality}</p>
                                    <p><strong>Date of Birth:</strong> {orderData.user.dob}</p>
                                </div>
                            </div>
                            {/* Contact Info */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <FaPhoneAlt className='w-4 h-4' /> Contact Information
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <p><strong>Email:</strong> {orderData.contact.email}</p>
                                    <p><strong>Phone:</strong> {orderData.contact.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact + Location */}
                        <div className="pl-4">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <IoLocationOutline className='w-5 h-5' /> Location
                            </h3>
                            <div className="space-y-1 text-sm">
                                <p><strong>Region:</strong> {orderData.location.region}</p>
                                <p><strong>District:</strong> {orderData.location.district}</p>
                                <p><strong>Neighbourhood:</strong> {orderData.location.neighbourhood}</p>
                                <p><strong>Street:</strong> {orderData.location.street}</p>
                                <p><strong>Building No:</strong> {orderData.location.buildingNo}</p>
                                <p><strong>Apartment No:</strong> {orderData.location.apartmentNo}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plan Info */}
                <div className="mb-6 pl-3">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FiPackage className='w-5 h-5' /> Plan Details
                    </h3>
                    <div className="space-y-1 text-sm">
                        <p><strong>Plan Name:</strong> {orderData.plan.name}</p>
                        <p><strong>Paid Price:</strong> {orderData.plan.price}</p>
                    </div>
                </div>


            </SlideOver>
        </div>
    );
}
