'use client';
import { IoMdArrowDropright } from 'react-icons/io';
import { TbSettings2 } from 'react-icons/tb';
import { PiUserListDuotone } from 'react-icons/pi';
import { FaPhoneAlt } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { agentImageType, AgentInfo, oredrStatus } from '@/types/all';
import { Button } from '@/components/ui/button';
import { convertDate } from '@/lib/global';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import ConfirmActionDialog from '../custom/confirm-action-dialog';
import ConfirmDeleteDialog from '../custom/confirm-delete-dialog';
import { onToggleAgentActive } from '@/lib/agent';
import { agentActivationToggleFailed, agentActivationToggleSuccess } from '../notifications/toast';

async function getAgentImageById(id: number): Promise<agentImageType | null> {
  try {
    const res = await fetch(`/api/agents/${id}/image`);
    if (!res.ok) throw new Error("Failed to fetch agent image");
    const data = await res.json();
    return data as agentImageType;
  } catch (error) {
    console.error("Error fetching agent image:", error);
    return null;
  }
}

export default function AgentSlideOverContent({selectedAgent, setSelectedAgent}:{selectedAgent:AgentInfo, setSelectedAgent:(selectedAgent:AgentInfo)=>void}){
    const [loaded, setLoaded] = useState(false);
    const [activests, setActivests] = useState(true);

    useEffect(() => {
        setLoaded(false);
        setActivests(selectedAgent.active);
        (async ()=>{
            const data = await getAgentImageById(selectedAgent.id);
            if(data){
                selectedAgent.image.data = data?.data;
                selectedAgent.image.mimetype = data?.mimetype;
                selectedAgent.image.name = data?.name;
                setLoaded(true);
            }
        })()
    }, [selectedAgent]);

    return(
        <>
            <div className="flex gap-3 mb-4 justify-end md:">
                {activests && (
                    <ConfirmDeleteDialog
                        onConfirm={async ()=>{
                            const sts = await onToggleAgentActive(selectedAgent.id, !selectedAgent.active);
                            if(sts){
                                agentActivationToggleSuccess(!selectedAgent.active);
                                selectedAgent.active=!selectedAgent.active
                                setSelectedAgent({...selectedAgent, active:selectedAgent.active});
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
                                setSelectedAgent({...selectedAgent, active:selectedAgent.active});
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
                <a href={`/orders/insurance/${""}/manage`} className="cursor-pointer">
                    <Button className="cursor-pointer"><MdOutlineRemoveRedEye /> Orders & Subagents <IoMdArrowDropright /></Button>
                </a>
            </div>

            {/* Order Status */}
            <div className="mb-4 flex items-center gap-2 justify-between">
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
                                {/* <p><strong>Name:</strong> {selectedOrder?.user.name}</p>
                                <p><strong>Nationality:</strong> {selectedOrder?.user.nationality}</p>
                                <p><strong>Date of Birth:</strong> {selectedOrder?.user.dob}</p> */}
                            </div>
                        </div>
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <FaPhoneAlt className='w-4 h-4' /> Contact Information
                            </h3>
                            <div className="space-y-1 text-sm">
                                {/* <p><strong>Email:</strong> {selectedOrder?.contact.email}</p>
                                <p><strong>Phone:</strong> {selectedOrder?.contact.phone}</p> */}
                            </div>
                        </div>
                    </div>

                    {/* Contact + Location */}
                    <div className="pl-4">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <IoLocationOutline className='w-5 h-5' /> Location
                        </h3>
                        <div className="space-y-1 text-sm">
                            {/* <p><strong>Region:</strong> {selectedOrder?.location.region}</p>
                            <p><strong>District:</strong> {selectedOrder?.location.district}</p>
                            <p><strong>Neighbourhood:</strong> {selectedOrder?.location.neighbourhood}</p>
                            <p><strong>Street:</strong> {selectedOrder?.location.street}</p>
                            <p><strong>Building No:</strong> {selectedOrder?.location.buildingNo}</p>
                            <p><strong>Apartment No:</strong> {selectedOrder?.location.apartmentNo}</p> */}
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
                    {/* <p><strong>Plan Name:</strong> {selectedOrder?.plan.name}</p>
                    <p><strong>Paid Price:</strong> {selectedOrder?.plan.price}</p> */}
                </div>
            </div>
        </>
    );
}