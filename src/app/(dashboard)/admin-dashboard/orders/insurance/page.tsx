'use client';

import { useEffect, useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { orderStatus } from '@prisma/client';

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


interface Order {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
  trackcode: string;
  msg?: string;
  user: { name: string; nationality: string; dob: string };
  contact: { email: string; phone: string };
  plan: { name: string; price: string };
  location: {
    region: string;
    district: string;
    neighbourhood: string;
    street: string;
    buildingNo: string;
    apartmentNo: string;
  };
}

async function fetchOrders(): Promise<Order[]> {
  return [
    {
      id: 'ORD001',
      trackcode: 'ORD001',
      name: 'John Doe',
      email: 'john@example.com',
      status: "rejected",
      created_at: '2025-07-14T10:30:00Z',
      user: {
        name: 'John Doe',
        nationality: 'Egyptian',
        dob: '1990-05-21',
      },
      contact: {
        email: 'john@example.com',
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
    },
    // Add more test entries
  ];
}


export default function Page() {
    const [open, setOpen] = useState(false);


    const [orders, setOrders] = useState<Order[]>([]);
    const [filtered, setFiltered] = useState<Order[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Pagination
    const itemsPerPage = 5;
    const [page, setPage] = useState(1);
    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    useEffect(() => {
        fetchOrders().then(data => {
        setOrders(data);
        setFiltered(data);
        });
    }, []);

    useEffect(() => {
        const result = orders.filter(order => {
        const matchesSearch = [order.name, order.email, order.id].some(val =>
            val.toLowerCase().includes(search.toLowerCase())
        );
        const matchesStatus = statusFilter === '' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
        });
        setFiltered(result);
        setPage(1); // reset page when filtered
    }, [search, statusFilter, orders]);


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

                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <Input
                    placeholder="Search by name, email, or ID..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="max-w-xs"
                    />
                    <Select onValueChange={val => setStatusFilter(val === 'all' ? '' : val)} defaultValue="all">
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {Object.keys(statusMap).map(status => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>

                </div>

                {/* Table */}
                <Table className="w-full">
                    <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {paginated.map(order => (
                        <TableRow key={order.id}>
                        <TableCell>
                            <span className={cn('text-sm px-2 py-1 rounded', statusMap[order.status as oredrStatus].color)}>
                            {statusMap[order.status as oredrStatus].label}
                            </span>
                        </TableCell>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" onClick={() => {
                                setSelectedOrder(order);
                                setOpen(true);
                            }}>View Details</Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{`Showing ${paginated.length} of ${filtered.length} orders`}</span>
                    <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => p + 1)}
                        disabled={page * itemsPerPage >= filtered.length}
                    >
                        Next
                    </Button>
                    </div>
                </div>




            {/* <Button onClick={() => setOpen(true)}>View Order Details</Button> */}

            <SlideOver open={open} onClose={() => setOpen(false)} title={`Order #${selectedOrder?.trackcode}`}>
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


            </SlideOver>
        </div>
    );
}
