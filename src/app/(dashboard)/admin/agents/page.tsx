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
import { useParams } from 'next/navigation';
import InsuranceOrders from '../orders/insurance/page';
import { exportToExcel, fetchAgentData } from '@/lib/exportData';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function AgentsManagement() {
    const params = useParams();
    const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';
    const [loading, setLoading] = useState(false);

    const [parentid, setParentid] = useState<number>(0);
    const [parentLVL, setParentLVL] = useState<number>(3);
    const [agentName, setAgentName] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [agents, setAgents] = useState<AgentInfo[]>([]);
    const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
    const [filtered, setFiltered] = useState<AgentInfo[]>([]);

    useEffect(() => {
        fetchAgentByCode(parent).then(res => {
            setParentid(res.id);
            setParentLVL(res.lvl);
            setAgentName(res.agent_name);
        });
    }, []);

    useEffect(() => {
        if (parentid !== 0) {
            fetchAgentsByParent(parentid.toString()).then(data => {
                setAgents(data);
                setFiltered(data);
            });
        }
    }, [parentid]);

    const handleExport = async () => {
        try {
            setLoading(true);
            const data = await fetchAgentData(parentid);
            exportToExcel(data, `agents_export_${agentName}`);
        } catch (err) {
            console.error('Export failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {parentLVL < 3 && (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div className=''>
                            <h1 className='text-2xl font-bold'>{parentLVL==1 ? "Agents" : "subAgents"}</h1>
                            <p className='text-muted-foreground text-sm mt-0.5'>Manage <span className='font-semibold text-zinc-600 dark:text-gray-300'>{agentName}&#39;</span>s {parentLVL==1 ? "Agents" : "subAgents"}</p>
                        </div>
                        { parentLVL < 3 && (
                            <Button onClick={()=>{setOpenDialog(true)}}><CgAddR /> Create New {parentLVL==1 ? "Agent" : "subAgent"}</Button>
                        )}
                    </div>

                    <Button
                        onClick={handleExport}
                        disabled={loading}
                        className="bg-[#1f9d61] hover:bg-[#1f9d61] text-white flex items-center gap-2 mb-2"
                    >
                        <PiMicrosoftExcelLogo className="text-white text-lg" />
                        {loading ? 'Fetching...' : 'Export subAgents'}
                    </Button>

                    <div className='mb-10'>
                        <AgentsTable agents={agents} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedAgent={setSelectedAgent}/>
                    </div>
                </>
            )}

            <SlideOver open={open} onClose={() => setOpen(false)} title={`Agent: ${selectedAgent?.agent_name}`}>
                {selectedAgent && (
                    <AgentSlideOverContent selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent} agents={agents} setAgents={setAgents}/>
                )}
            </SlideOver>

            
            <InsuranceOrders/>

            { parentLVL < 3 && (
                <CreateAgentFormDialog
                    agents={agents}
                    setAgents={setAgents}
                    open={openDialog}
                    parentid={parentid}
                    parentLVL={parentLVL}
                    onClose={() => setOpenDialog(false)}
                />
            )}
        </div>
    );
}