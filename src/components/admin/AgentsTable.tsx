// components/layout/DashboardHeader.tsx
"use client";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {AgentInfo} from '@/types/all';
import { GoOrganization } from "react-icons/go";
import { convertDate } from '@/lib/global';

export function AgentsTable(
{
    agents, filtered, setFiltered, setOpen, setSelectedAgent
}:{
    agents: AgentInfo[], filtered: AgentInfo[], setFiltered:(result:AgentInfo[])=>void, setOpen:(val:boolean)=>void, setSelectedAgent:(order:AgentInfo)=>void
}) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    

    // Pagination
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    
    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    useEffect(() => {
        const result = agents.filter(agent => {
            // Normalize values to lowercase for case-insensitive comparison
            const searchLower = search.toLowerCase();

            // Match by name, url, email, user name or id
            const matchesSearch = 
                agent.agent_name?.toLowerCase().includes(searchLower) ||
                agent.url?.toLowerCase().includes(searchLower) ||
                // agent.user.email?.toLowerCase().includes(searchLower) ||
                agent.user.name?.toLowerCase().includes(searchLower) // ||
                // agent.id?.toString().includes(searchLower)
            ;

            // Match status filter (active/inactive/empty)
            const matchesStatus =
                statusFilter === '' ||
                (statusFilter === 'active' && agent.active === true) ||
                (statusFilter === 'inactive' && agent.active === false);

            return matchesSearch && matchesStatus;
        });

        setFiltered(result);
        setPage(1); // reset to first page when filter changes
    }, [search, statusFilter, agents]);

    return (
        <>
            <div className="mb-3 flex flex-wrap gap-4 items-center justify-between">
                <Input
                placeholder="Search by Agent name, URL, or owner email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="max-w-xs rounded-sm"
                />
                <Select onValueChange={val => setStatusFilter(val === 'all' ? '' : val)} defaultValue="all">
                    <SelectTrigger className="w-40 rounded-sm">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem key={"active"} value={"active"}>Active</SelectItem>
                        <SelectItem key={"inactive"} value={"inactive"}>Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            

            <div className="rounded-sm border overflow-hidden mt-2 mb-4">
                <Table className='w-full caption-bottom text-sm'>
                    <TableHeader>
                        <TableRow className='bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-900'>
                            <TableHead className='px-4'>Status</TableHead>
                            <TableHead className='px-4'>Agent Name</TableHead>
                            <TableHead className='px-4'>Agent Owner</TableHead>
                            <TableHead className='px-4'>URL</TableHead>
                            <TableHead className='px-4'>Percent</TableHead>
                            <TableHead className='px-4'>Creation Date</TableHead>
                            <TableHead className='px-4'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map(agent => (
                            <TableRow key={agent.id}>
                                <TableCell className='px-4'>
                                    <span className={`text-sm px-2 py-1 rounded ${agent.active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                        {agent.active ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>
                                <TableCell className='px-4'>{agent.agent_name}</TableCell>
                                <TableCell className='px-4'>{agent.user.email}</TableCell>
                                <TableCell className='px-4'>{agent.url}</TableCell>
                                <TableCell className='px-4'>{agent.percent}%</TableCell>
                                <TableCell className='px-4'>{convertDate(agent.created_at)}</TableCell>
                                <TableCell className="px-4 rounded-sm">
                                    <Button variant="outline" onClick={() => {
                                        setSelectedAgent(agent);
                                        setOpen(true);
                                    }}><GoOrganization /> View & Manage</Button>
                                </TableCell>
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