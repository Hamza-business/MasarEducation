'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {AgentInfo} from '@/types/all';
import { AgentsTable } from '@/components/admin/AgentsTable';
import { Button } from '@/components/ui/button';
import { CgAddR } from 'react-icons/cg';
import { fetchAgentByCode, fetchAgentsByParent } from '@/lib/agent';
import CreateAgentFormDialog from '@/components/admin/CreateAgentFormDialog';
import AgentSlideOverContent from '@/components/admin/AgentSlideOverContent';
import { FC } from "react";
import { useParams } from 'next/navigation';


export default function AgentsManagement() {
    const params = useParams();
    const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';

    const [parentid, setParentid] = useState<number>(1);
    const [parentLVL, setParentLVL] = useState<number>(1);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [agents, setAgents] = useState<AgentInfo[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
    const [filtered, setFiltered] = useState<AgentInfo[]>([]);

    useEffect(() => {
        console.log(parent);
        fetchAgentByCode(parent).then( res => {
            setParentid(res.id);
            setParentLVL(res.lvl);
            fetchAgentsByParent(parentid.toString()).then(data => {
                setAgents(data);
                setFiltered(data);
            });
        })
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className=''>
                    <h1 className='text-2xl font-bold'>Agents</h1>
                    <p className='text-muted-foreground text-sm'>Manage Agents</p>
                </div>
                <Button onClick={()=>{setOpenDialog(true)}}><CgAddR /> Create New Agent</Button>
            </div>

            <AgentsTable agents={agents} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedAgent={setSelectedAgent}/>

            <SlideOver open={open} onClose={() => setOpen(false)} title={`Agent: ${selectedAgent?.agent_name}`}>
                {selectedAgent && (
                    <AgentSlideOverContent selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} agents={agents} setAgents={setAgents}/>
                )}
            </SlideOver>

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
