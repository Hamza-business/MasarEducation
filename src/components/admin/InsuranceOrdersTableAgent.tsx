// components/layout/DashboardHeader.tsx
"use client";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { orderStatus } from '@prisma/client';
import { MdOutlineViewInAr } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {OrderDetails, oredrStatus} from '@/types/all';
import { statusMap } from '@/constants/global';
import { cn } from '@/lib/utils';
import { convertDate } from '@/lib/global';
import { usePathname } from 'next/navigation';

export function InsuranceOrderTableAgent(
{
    orders, filtered, setFiltered, setOpen, setSelectedOrder
}:{
    orders: OrderDetails[], filtered: OrderDetails[], setFiltered:(result:OrderDetails[])=>void, setOpen:(val:boolean)=>void, setSelectedOrder:(order:OrderDetails)=>void
}) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const pathname = usePathname().split('/');
    let pathurl = "";
    if(pathname[1] == "admin"){
        pathurl = pathname[1]
    } else if (pathname[1] == "agent"){
        pathurl = `${pathname[1]}/${pathname[2]}`
    }
    

    // Pagination
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    
    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    useEffect(() => {
        const result = orders.filter(order => {
            const matchesSearch = [order.user.name, order.trackcode, order.agent?.name].some(val =>
                val?.toLowerCase().includes(search.toLowerCase())
            );
            const matchesStatus = statusFilter === '' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
        setFiltered(result);
        setPage(1); // reset page when filtered
    }, [search, statusFilter, orders]);

    return (
        <>
            <div className="mb-3 flex flex-wrap gap-4 items-center justify-between">
                <Input
                placeholder="Search by Client name, email, Order track code, agent name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="max-w-xl rounded-sm"
                />
                <Select onValueChange={val => setStatusFilter(val === 'all' ? '' : val)} defaultValue="all">
                    <SelectTrigger className="w-40 rounded-sm">
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
            

            <div className="rounded-sm border overflow-hidden mt-2 mb-4">
                <Table className='w-full caption-bottom text-sm'>
                    <TableHeader>
                        <TableRow className='bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-900'>
                            <TableHead className='px-4'>Status</TableHead>
                            <TableHead className='px-4'>Name</TableHead>
                            <TableHead className='px-4'>Price</TableHead>
                            <TableHead className='px-4'>Track Code</TableHead>
                            <TableHead className='px-4'>Agent Name</TableHead>
                            <TableHead className='px-4'>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className='px-4 py-3'>
                                    <span className={cn('text-sm px-2 py-1 rounded', statusMap[order.status as oredrStatus].color)}>
                                        {statusMap[order.status as oredrStatus].label}
                                    </span>
                                </TableCell>
                                <TableCell className='px-4 py-3'>{order.user.name}</TableCell>
                                <TableCell className='px-4 py-3'>{order.plan.price}</TableCell>
                                <TableCell className='px-4 py-3'>{order.trackcode}</TableCell>
                                <TableCell className='px-4 py-3'><a href={`/${pathurl}/agents/${order.agent?.url}`} className='text-blue-400'>{order.agent?.name}</a></TableCell>
                                <TableCell className='px-4 py-3'>{convertDate(order.created_at)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{`Showing ${paginated.length} of ${filtered.length} orders`}</span>
                <div className="space-x-2 inline-flex">
                    <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                        <IoIosArrowBack /> Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page * itemsPerPage >= filtered.length}>
                        Next <IoIosArrowForward />
                    </Button>
                </div>
            </div>
        </>
    );
}