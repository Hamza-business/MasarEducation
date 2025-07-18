'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {AgentInfo} from '@/types/all';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';
import { AgentsTable } from '@/components/admin/AgentsTable';
import { Button } from '@/components/ui/button';
import { CgAddR } from 'react-icons/cg';
import { fetchAgentsByParent } from '@/lib/apis';
import CreateAgentFormDialog from '@/components/admin/CreateAgentFormDialog';


export default function AgentsManagement() {
    const parentid = 1;
    const parentLVL = 1;
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [agents, setAgents] = useState<AgentInfo[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
    const [filtered, setFiltered] = useState<AgentInfo[]>([]);

    useEffect(() => {
        fetchAgentsByParent(parentid.toString()).then(data => {
            setAgents(data);
            setFiltered(data);
        });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className=''>
                    <h1 className='text-2xl font-bold'>Agents</h1>
                    <p className='text-muted-foreground text-sm'>Manage Agents</p>
                </div>
                <Button onClick={()=>{setOpenDialog(true)}}><CgAddR className="mr-2" /> Create New Agent</Button>
            </div>

            <AgentsTable agents={agents} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedAgent={setSelectedAgent}/>


            {/* <SlideOver open={open} onClose={() => setOpen(false)} title={`Order #${selectedOrder?.trackcode}`}>
                <OrderSlideOverContent selectedOrder={selectedOrder}/>
            </SlideOver> */}

            <CreateAgentFormDialog
                agents={agents}
                setAgents={setAgents}
                open={openDialog}
                parentid={parentid}
                parentLVL={parentLVL}
                onClose={() => setOpenDialog(false)}
            />
        </div>
    );
}
