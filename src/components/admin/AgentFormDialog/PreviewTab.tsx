import { Button } from "@/components/ui/button";
import type { agentImageType, agentInfoType, agentUserType, PriceRange } from "@/types/all";
import { IoIosArrowBack, IoMdDoneAll } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegCopy } from "react-icons/fa";
import Field from "@/components/custom/Field";
import { validateAgentCreation } from "@/components/validations/validateAgentCreation";
import { toastMissingErorr } from "@/components/notifications/toast";

type Props = {
    agentInfo: agentInfoType,
    agentUser: agentUserType,
    agentImage:agentImageType | null,
    onBack: () => void;
    onCancel: () => void;
    onSubmit: () => void;
};

export default function PreviewTab({
    agentInfo,
    agentUser,
    agentImage,
    onBack,
    onCancel,
    onSubmit,
}: Props) {
    const [copied, setCopied] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const payload = {
        agentInfo,
        agentUser,
        agentImage,
    };

    const handleCopy = async () => {
        try {
            const data = `
Agent Info
  Agent Referral Link: https://masar.edu/${agentInfo?.url}/services/insurance/order
  Dashboard Portal: https://masar.edu/agent
  Agent Name: ${agentInfo?.agent_name}

Agent Owner Login Info
  Email: ${agentUser?.email}.agent@masare.edu
  Password: ${agentUser?.password}
  Name: ${agentUser?.name}
`.trim();
            await navigator.clipboard.writeText(data).then(()=>{
                setCopied(true);
                toast.success("Copied to clipboard!");
            });
        } catch (err) {
            toast.error("Failed to copy.");
        }
    };

    useEffect(() => {
        const errors = validateAgentCreation(agentInfo, agentUser, agentImage);
        if(errors.length > 0){
            toastMissingErorr(errors[0]);
            setDisabled(true);
        } else{
            setDisabled(false);
        }
    }, [agentInfo, agentUser, agentImage]);

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {!disabled && (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Preview All Agent Data</h3>
                            <Button onClick={!disabled ? handleCopy : ()=>{}} disabled={disabled}><FaRegCopy /> Copy Agent Info</Button>
                        </div>
                    
                        <ScrollArea className="h-[400px] w-full rounded-md pr-3 pt-2">
                            <Card className="p-5 rounded-sm gap-2 mb-6">
                              <CardHeader className="px-0">
                                <CardTitle>Agent Info</CardTitle>
                              </CardHeader>
                              <CardContent className="grid grid-cols-1 gap-y-3 gap-x-0 text-sm px-0">
                                <Field label="Agent Referral Link" value={`https://masar.edu/${agentInfo?.url}/services/insurance/order`} />
                                <Field label="Dashboard Portal" value={"https://masar.edu/agent"} />
                                <div className="grid grid-cols-2 gap-4 text-sm px-0">
                                  <Field label="Agent Name" value={agentInfo?.agent_name} />
                                  <Field label="Percent" value={agentInfo?.percent + "%"} />
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="p-5 rounded-sm gap-2 mb-6">
                              <CardHeader className="px-0">
                                <CardTitle>Agent Owner Login Info</CardTitle>
                              </CardHeader>
                              <CardContent className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm px-0">
                                <Field label="Email" value={`${agentUser?.email}.agent@masare.edu`} />
                                <Field label="Password" value={agentUser?.password} />
                                <Field label="Name" value={agentUser?.name} />
                              </CardContent>
                            </Card>

                            <Card className="p-5 rounded-sm gap-2 mb-6">
                              <CardHeader className="px-0">
                                <CardTitle>Agent Logo</CardTitle>
                              </CardHeader>
                              <CardContent className="px-0">
                                {agentImage?.data ? (
                                  <img
                                    src={`data:${agentImage.mimetype};base64,${agentImage.data}`}
                                    alt="Agent Logo"
                                    className="w-full object-cover rounded border"
                                  />
                                ) : (
                                  <p className="text-muted-foreground">No image uploaded</p>
                                )}
                              </CardContent>
                            </Card> 
                        </ScrollArea>
                    </>
                )}
                {disabled && (
                  <p className="text-red-500 text-center">Please, fill all missed data.</p>
                )}
          </div>

            <div className="flex justify-between mt-2">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onCancel}> Cancel</Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onBack}><IoIosArrowBack />Back</Button>
                    <Button onClick={!disabled ? onSubmit : ()=>{}} disabled={disabled}>Create</Button>
                </div>
            </div>
        </div>
    );
}
