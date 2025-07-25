'use client';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { AgentInfo } from '@/types/all';
import { Button } from '@/components/ui/button';
import { convertDate } from '@/lib/global';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import ConfirmActionDialog from '../custom/confirm-action-dialog';
import ConfirmDeleteDialog from '../custom/confirm-delete-dialog';
import { getAgentImageById, onToggleAgentActive } from '@/lib/agent';
import { agentActivationToggleFailed, agentActivationToggleSuccess } from '../notifications/toast';
import LineField from '../custom/LineField';
import { BsBuildings } from "react-icons/bs";
import { TbUserShield } from 'react-icons/tb';
import { usePathname } from 'next/navigation';

export default function AgentSlideOverContent(
    {
        selectedAgent, 
        setSelectedAgent,
        agents,
        setAgents
    }:{
        selectedAgent:AgentInfo,
        setSelectedAgent:(selectedAgent:AgentInfo)=>void,
        agents: AgentInfo[],
        setAgents: (agents:AgentInfo[])=>void,
    }
){
    const [loaded, setLoaded] = useState(false);
    const [activests, setActivests] = useState(true);
    const pathname = usePathname().split('/');
    let pathurl = "";
    if(pathname[1] == "admin"){
        pathurl = pathname[1]
    } else if (pathname[1] == "agent"){
        pathurl = `${pathname[1]}/${pathname[2]}`
    }

    useEffect(() => {
        setLoaded(false);
        setActivests(selectedAgent.active);
        (async ()=>{
            if(selectedAgent.image.data){
                setLoaded(true);
                return
            }
            const data = await getAgentImageById(selectedAgent.id);
            if(data){
                selectedAgent.image.data = data?.data;
                selectedAgent.image.mimetype = data?.mimetype;
                selectedAgent.image.name = data?.name;
                setAgents([...agents]);
                setLoaded(true);
            }
        })()
    }, [selectedAgent]);


    return(
        <>
            <div className="flex gap-3 mb-4 justify-end">
                {activests && (
                    <ConfirmDeleteDialog
                        onConfirm={async ()=>{
                            const sts = await onToggleAgentActive(selectedAgent.id, !selectedAgent.active);
                            if(sts){
                                agentActivationToggleSuccess(!selectedAgent.active);
                                selectedAgent.active=!selectedAgent.active
                                setAgents([...agents]);
                                setActivests(!activests);
                            } else{
                                agentActivationToggleFailed(!selectedAgent.active)
                            }
                        }}
                        description={
                            <>
                                <strong className="mb-1">Are you sure you want to deActivate this Agent?</strong>
                                <span className="px-2 mb-2 block">
                                    • DeActivating it will cause users to not able to create orders again from this agent.
                                </span>
                                <span className="px-2 mb-2 block">
                                    • Users will be redirected to its parent agent ordering page.
                                </span>
                            </>
                        }
                        confirmText="DeActivate This Plan"
                    >
                        <Button
                            variant="outline"
                            className="text-red-500 hover:bg-red-500 hover:text-white border border-red-500 px-4 py-2 rounded-md w-30 meow"
                        > <BiHide /> Deactivate</Button>
                    </ConfirmDeleteDialog>
                )}
                {!activests && (
                    <ConfirmActionDialog
                        onConfirm={async ()=>{
                            const sts = await onToggleAgentActive(selectedAgent.id, !selectedAgent.active);
                            if(sts){
                                agentActivationToggleSuccess(!selectedAgent.active);
                                selectedAgent.active=!selectedAgent.active
                                setAgents([...agents]);
                                setActivests(!activests);
                            } else{
                                agentActivationToggleFailed(!selectedAgent.active);
                            }
                        }}
                        description={
                            <>
                                <strong className="mb-1">Are you sure you want to reActivate this Agent?</strong>
                                <span className="px-2 mb-2 block">
                                    • ReActivating it will cause users to be able to create orders again from this agent.
                                </span>
                            </>
                        }
                        confirmText="Activate This Plan"
                    >
                        <Button
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md w-30"
                        ><BiShow /> Reactivate</Button>
                    </ConfirmActionDialog>
                )}
                <a href={`/${pathurl}/agents/${selectedAgent.url}`} className="cursor-pointer">
                    <Button className="cursor-pointer"><MdOutlineRemoveRedEye /> Orders & subAgents <IoMdArrowDropright /></Button>
                </a>
            </div>

            {/* Order Status */}
            <div className="mb-6 flex items-center gap-2 justify-between">
                <div>
                    <span className={`px-3 py-1 rounded-sm text-sm font-medium ${activests ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {activests ? "Active" : "Inactive"}
                    </span>
                </div>
                <div className="flex items-center gap-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Agent Created on</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{convertDate(selectedAgent?.created_at || "")}</span>
                </div>
            </div>
            
            {loaded && (
                <img src={`data:${selectedAgent.image.mimetype};base64,${selectedAgent.image.data}`} alt="" className='rounded-sm w-full'/>
            )}
            {!loaded && (
                <Skeleton className='w-full h-30'/>
            )}

            <div className="mt-6 px-2">
                <div className="p-0 gap-2 mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <BsBuildings className='w-6 h-6' /> Agent Information
                    </h3>
                    <div className="grid grid-cols-1 gap-y-3 gap-x-0 text-sm px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm px-0">
                            <LineField label="Agent Name" value={selectedAgent?.agent_name} />
                            <LineField label="Percent" value={selectedAgent?.percent + "%"} />
                        </div>
                        <LineField label="Agent Referral Link" value={`https://masartr.com/${selectedAgent?.url}/insurance`} link={`/${selectedAgent?.url}/insurance`} type={"link"} style={"text-blue-500"}/>
                        <LineField label="Dashboard Portal" value={"https://masartr.com/agent"} link={"/agent"} type={"link"} style={"text-blue-500"}/>
                    </div>
                </div>
            </div>

            <hr />
            
            <div className="mt-6 px-2">
                <div className="p-0 gap-2 mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <TbUserShield className='w-6 h-6' /> Owner Information
                    </h3>
                    <div className="grid grid-cols-1 gap-y-3 gap-x-0 text-sm px-2">
                        <LineField label="Email" value={`${selectedAgent?.user?.email}.agent@masare.edu`} />
                        <LineField label="Password" value={selectedAgent?.user?.password} />
                        <LineField label="Name" value={selectedAgent?.user?.name} />
                    </div>
                </div>
            </div>
        </>
    );
}