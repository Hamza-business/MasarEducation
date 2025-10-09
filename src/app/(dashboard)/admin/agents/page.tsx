'use client';

import { useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import { AgentInfo } from '@/types/all';
import { AgentsTable } from '@/components/admin/AgentsTable';
import CreateAgentFormDialog from '@/components/admin/CreateAgentFormDialog';
import AgentSlideOverContent from '@/components/admin/AgentSlideOverContent';
import { useParams } from 'next/navigation';
import { exportToExcel, fetchAgentData } from '@/lib/exportData';
import { useAgentData } from '@/hooks/useAgentData';
import { AgentManagementSection } from '@/components/admin/AgentManagementSection';
import { InsuranceOrdersSection } from '@/components/admin/InsuranceOrdersSection';
import { useAgentOrders } from '@/hooks/useSiteAPIs';

export default function AgentsManagement() {
    const params = useParams();
    const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);

    const {
        parentid,
        parentLVL,
        agentName,
        agents,
        updateAgent,
        isLoading,
        error,
    } = useAgentData({ parentCode: parent });

    // Use SWR hook for agent orders
    const { orders, isLoading: ordersLoading, error: ordersError } = useAgentOrders(parentid);

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
            <AgentManagementSection
                parentLVL={parentLVL}
                agentName={agentName}
                parentid={parentid}
                agents={agents}
                isLoading={loading}
                onExport={handleExport}
                onOpenDialog={() => setOpenDialog(true)}
            >
                <AgentsTable agents={agents} setOpen={setOpen} setSelectedAgent={setSelectedAgent}/>
            </AgentManagementSection>

            <SlideOver open={open} onClose={() => setOpen(false)} title={`Agent: ${selectedAgent?.agent_name}`}>
                {selectedAgent && (
                    <AgentSlideOverContent 
                        selectedAgent={selectedAgent} 
                        setSelectedAgent={setSelectedAgent} 
                        agents={agents} 
                        setAgents={(newAgents) => {
                            // Update agents using the hook's updateAgent function
                            newAgents.forEach(agent => {
                                const existingAgent = agents.find(a => a.id === agent.id);
                                if (existingAgent && existingAgent !== agent) {
                                    updateAgent(agent.id, agent);
                                }
                            });
                        }}
                    />
                )}
            </SlideOver>

            <InsuranceOrdersSection
                agentName={agentName}
                parentid={parentid}
                orders={orders}
                isLoading={ordersLoading}
                error={ordersError}
            />

            { parentLVL < 3 && (
                <CreateAgentFormDialog
                    agents={agents}
                    setAgents={(newAgents) => {
                        // Update agents using the hook's updateAgent function
                        newAgents.forEach(agent => {
                            const existingAgent = agents.find(a => a.id === agent.id);
                            if (existingAgent && existingAgent !== agent) {
                                updateAgent(agent.id, agent);
                            }
                        });
                    }}
                    open={openDialog}
                    parentid={parentid}
                    parentLVL={parentLVL}
                    onClose={() => setOpenDialog(false)}
                />
            )}
        </div>
    );
}