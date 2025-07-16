'use client';
import { IoMdArrowDropright } from 'react-icons/io';
import { TbSettings2 } from 'react-icons/tb';
import { PiUserListDuotone } from 'react-icons/pi';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { OrderDetails, oredrStatus } from '@/types/all';
import { statusMap } from '@/constants/global';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { convertDate } from '@/lib/global';



export default function OrderSlideOverContent({selectedOrder}:{selectedOrder:OrderDetails | null}){
    return(
        <>
            {/* Top Actions */}
            <div className="flex gap-3 mb-4 justify-end">
                <a href={`/orders/insurance/${selectedOrder?.trackcode}/manage`} className="cursor-pointer">
                    <Button className="cursor-pointer"><TbSettings2 /> Manage Order <IoMdArrowDropright /></Button>
                </a>
            </div>

            {/* Order Status */}
            <div className="mb-4 flex items-center gap-2 justify-between">
                <div>
                    <span
                        className={cn(
                            'px-3 py-1 rounded-sm text-sm font-medium',
                            statusMap[(selectedOrder?.status || 'completed') as oredrStatus].color
                        )}
                    >{statusMap[(selectedOrder?.status || 'completed') as oredrStatus].label}</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Order Issued on</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{convertDate(selectedOrder?.created_at || "")}</span>
                </div>
            </div>
            
            {((selectedOrder?.status || 'completed') as oredrStatus === "rejected") && (
                <>
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>Reject Message</span>
                    <div className="mt-2 bg-red-50 dark:bg-zinc-900 dark:text-red-400 p-4 rounded-sm text-sm text-gray-800 border border-red-300 dark:border-red-500">
                        {selectedOrder?.msg}
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
                                <p><strong>Name:</strong> {selectedOrder?.user.name}</p>
                                <p><strong>Nationality:</strong> {selectedOrder?.user.nationality}</p>
                                <p><strong>Date of Birth:</strong> {selectedOrder?.user.dob}</p>
                            </div>
                        </div>
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <FaPhoneAlt className='w-4 h-4' /> Contact Information
                            </h3>
                            <div className="space-y-1 text-sm">
                                <p><strong>Email:</strong> {selectedOrder?.contact.email}</p>
                                <p><strong>Phone:</strong> {selectedOrder?.contact.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact + Location */}
                    <div className="pl-4">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <IoLocationOutline className='w-5 h-5' /> Location
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p><strong>Region:</strong> {selectedOrder?.location.region}</p>
                            <p><strong>District:</strong> {selectedOrder?.location.district}</p>
                            <p><strong>Neighbourhood:</strong> {selectedOrder?.location.neighbourhood}</p>
                            <p><strong>Street:</strong> {selectedOrder?.location.street}</p>
                            <p><strong>Building No:</strong> {selectedOrder?.location.buildingNo}</p>
                            <p><strong>Apartment No:</strong> {selectedOrder?.location.apartmentNo}</p>
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
                    <p><strong>Plan Name:</strong> {selectedOrder?.plan.name}</p>
                    <p><strong>Paid Price:</strong> {selectedOrder?.plan.price}</p>
                </div>
            </div>
        </>
    );
}