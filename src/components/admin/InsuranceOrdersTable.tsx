// components/admin/InsuranceOrdersTable.tsx
"use client";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { MdOutlineViewInAr } from 'react-icons/md';
import { Button } from '../ui/button';
import { OrderDetails, oredrStatus } from '@/types/all';
import { statusMap } from '@/constants/global';
import { cn } from '@/lib/utils';
import { convertDate } from '@/lib/global';
import { usePathname } from 'next/navigation';
import { useTableFilter } from '@/hooks/useTableFilter';

export function InsuranceOrderTable({
    orders,
    setOpen,
    setSelectedOrder
}: {
    orders: OrderDetails[];
    setOpen: (val: boolean) => void;
    setSelectedOrder: (order: OrderDetails) => void;
}) {
    const pathname = usePathname().split('/');
    let pathurl = "";
    if(pathname[1] == "admin"){
        pathurl = pathname[1]
    } else if (pathname[1] == "agent"){
        pathurl = `${pathname[1]}/${pathname[2]}`
    }

    const {
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        paginated,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        filtered,
    } = useTableFilter({
        data: orders,
        searchFields: ['trackcode'],
        statusOptions: Object.keys(statusMap).reduce((acc, status) => {
            acc[status] = (order: OrderDetails) => order.status === status;
            return acc;
        }, {} as Record<string, (order: OrderDetails) => boolean>),
    });

    // Custom search logic for nested fields
    const filteredOrders = orders.filter(order => {
        const searchLower = search.toLowerCase();
        const matchesSearch = search === '' || 
            order.user.name?.toLowerCase().includes(searchLower) ||
            order.contact.email?.toLowerCase().includes(searchLower) ||
            order.trackcode?.toLowerCase().includes(searchLower) ||
            order.agent?.name?.toLowerCase().includes(searchLower);
        
        const matchesStatus = statusFilter === '' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const paginatedOrders = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                            <TableHead className='px-4'>Email</TableHead>
                            <TableHead className='px-4'>Price</TableHead>
                            <TableHead className='px-4'>Track Code</TableHead>
                            <TableHead className='px-4'>Order Date</TableHead>
                            <TableHead className='px-4'>Agent Name</TableHead>
                            <TableHead className='px-4'>Agent Percent / Amount</TableHead>
                            <TableHead className='px-4'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className='px-4'>
                                    <span className={cn('text-sm px-2 py-1 rounded', statusMap[order.status as oredrStatus].color)}>
                                        {statusMap[order.status as oredrStatus].label}
                                    </span>
                                </TableCell>
                                <TableCell className='px-4'>{order.user.name}</TableCell>
                                <TableCell className='px-4'>{order.contact.email}</TableCell>
                                <TableCell className='px-4'>{order.plan.price}</TableCell>
                                <TableCell className='px-4'>{order.trackcode}</TableCell>
                                <TableCell className='px-4'>{convertDate(order.created_at)}</TableCell>
                                <TableCell className='px-4'><a href={`/${pathurl}/agents/${order.agent?.url}`} className='text-blue-400'>{order.agent?.name}</a></TableCell>
                                <TableCell className='px-4'>₺ {order.agent?.percent}</TableCell>
                                <TableCell className="px-4 rounded-sm">
                                    <Button variant="outline" onClick={() => {
                                        setSelectedOrder(order);
                                        setOpen(true);
                                    }}><MdOutlineViewInAr /> View Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{`Showing ${paginatedOrders.length} of ${filteredOrders.length} orders`}</span>
                <div className="space-x-2 inline-flex">
                    <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
                        <IoIosArrowBack /> Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= filteredOrders.length}>
                        Next <IoIosArrowForward />
                    </Button>
                </div>
            </div>
        </>
    );
}