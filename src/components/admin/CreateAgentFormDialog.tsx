"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AgentInfoTab from "./AgentFormDialog/AgentInfoTab";
import UserInfoTab from "./AgentFormDialog/UserInfoTab";
import { Tabs} from "@/components/ui/tabs";
import type { agentImageType, AgentInfo, agentInfoType, agentUserType } from "@/types/all";
import TabNavigation from "./AgentFormDialog/TabNavigation";
import { validateInsurancePackage } from "@/components/validations/validateInsurancePackage";
import { somethingWentWrong, toastValidationErorr, uniquenessError } from "../notifications/toast";
import ImageUploadTab from "./AgentFormDialog/ImageUploadTab";
import PreviewTab from "./AgentFormDialog/PreviewTab";
import { checkUniqueEmail, checkUniqueLink, storeAgentInfoToDB, storeOwnerInfoToDB, uploadAgentLogoToDB } from "@/lib/agent";

type Props = {
    agents: AgentInfo[];
    setAgents: (agents: AgentInfo[]) => void;
    open: boolean;
    parentid: number;
    parentLVL: number;
    onClose: () => void;
};

export default function CreateAgentFormDialog({
    agents,
    setAgents,
    open,
    parentid,
    parentLVL,
    onClose,
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStep, setSubmitStep] = useState<string | null>(null);
    const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState<"agent" | "user" | "image" | "preview">("agent");
    const [agentInfo, setAgentInfo] = useState<agentInfoType>({
        id:0,
        parent_agent: parentid,
        userid: 0,
        agent_image: 0,
        percent: 0,
        agent_name: "",
        lvl: parentLVL+1,
        url: "",
        created_at: "",
        active: true,
    })
    const [agentUser, setUserInfo] = useState<agentUserType>({
        id:0,
        email: "",
        password: "",
        name: "",
        created_at:"",
    })
    const [agentImage, setAgentImage] = useState<agentImageType>({
        id: 0,
        name: "",
        mimetype: "",
        data: ""
    })
    const [newAgent, setNewAgent] = useState<AgentInfo>({
        id: 0,
        agent_name: "",
        lvl: 0,
        percent: 0,
        url: "",
        active: true,
        created_at: "",
        user: {
            id: 0,
            email: "",
            password: "",
            name: "",
            created_at: ""
        },
        image: {
            id: 0,
            name: "",
            mimetype: "",
            data: "",
        }
    });

    useEffect(() => {
        if (open) {
            handleReset();
            setCurrentTab("agent");
        }
    }, [open]);

    const handleReset = () => {
        setAgentInfo({
            id:0,
            parent_agent: parentid,
            userid: 0,
            agent_image: 0,
            percent: 0,
            agent_name: "",
            lvl: parentLVL+1,
            url: "",
            created_at: "",
            active: true,
        });
        setUserInfo({
            id:0,
            email: "",
            password: "",
            name: "",
            created_at:"",
        });
        setAgentImage({
            id: 0,
            name: "",
            mimetype: "",
            data: ""
        });
        setNewAgent({
            id: 0,
            agent_name: "",
            lvl: 0,
            percent: 0,
            url: "",
            active: true,
            created_at: "",
            user: {
                id: 0,
                email: "",
                password: "",
                name: "",
                created_at: ""
            },
            image: {
                id: 0,
                name: "",
                mimetype: "",
                data: "",
            }
        })
    };

    const handleCancel = () => {
        onClose();
    };

    const handleFinalSubmit = async () => {
        try {
            setIsSubmittingDialogOpen(true);

            setSubmitStep("Validating Agent URL");
            const isUniqueAgentURL = await checkUniqueLink(agentInfo.url);
            if(!isUniqueAgentURL){
                setIsSubmittingDialogOpen(false);
                setIsSubmitting(false);
                uniquenessError("This Agent URL is used before, please choose another name.")
                return;
            }

            setSubmitStep("Validating User Email");
            const isUniqueEmail = await checkUniqueEmail(agentUser.email);
            if(!isUniqueEmail){
                setIsSubmittingDialogOpen(false);
                setIsSubmitting(false);
                uniquenessError("This Owner Email is used with other agent, please choose another email.")
                return;
            }
            
            setSubmitStep("Uploading Agent Logo");
            const agentLogoId = await uploadAgentLogoToDB(agentImage);
            
            agentImage.id = agentLogoId;
            agentInfo.agent_image = agentLogoId;

            newAgent.image.id = agentImage.id;
            newAgent.image.name = agentImage.name;
            newAgent.image.data = agentImage.data;
            newAgent.image.mimetype = agentImage.mimetype;

            
            setSubmitStep("Creating Agent Owner Account");
            const userData = await storeOwnerInfoToDB(agentUser);
            const agentUserId = userData.id;

            agentUser.id = agentUserId;
            agentUser.created_at = userData.created_at;
            agentInfo.userid = agentUserId;

            newAgent.user.id = agentUser.id;
            newAgent.user.email = agentUser.email;
            newAgent.user.name = agentUser.name;
            newAgent.user.password = agentUser.password;
            newAgent.user.created_at= agentUser.created_at;



            setSubmitStep("Creating New Agent");
            const agentData = await storeAgentInfoToDB(agentInfo);
            const agentInfoId = agentData.id;

            agentInfo.id = agentInfoId;
            agentInfo.created_at = agentData.created_at;

            newAgent.id = agentInfo.id;
            newAgent.percent = agentInfo.percent;
            newAgent.agent_name = agentInfo.agent_name;
            newAgent.lvl = agentInfo.lvl;
            newAgent.url = agentInfo.url;
            newAgent.created_at = agentInfo.created_at

            // console.clear();
            // console.log("########## agentImage");
            // console.log(agentImage);
            // console.log("########## agentUser");
            // console.log(agentUser);
            // console.log("########## agentInfo");
            // console.log(agentInfo);
            // console.log("########## newAgent");
            // console.log(newAgent);
            
            if(newAgent)
              setAgents([...agents, newAgent]);
            setIsSubmitting(false);
            setIsSubmittingDialogOpen(false);
            onClose();
        } catch (err) {
          setIsSubmittingDialogOpen(false)
          somethingWentWrong("Something went wrong. Please try again.");
          setIsSubmitting(false);
        }
    };
    
    return (
        <>
            <Dialog open={open} onOpenChange={(v) => !v && handleCancel()}>
                <DialogContent className="!max-w-2xl !w-full overflow-auto" style={{ maxHeight: "calc(100% - 40px)" }}>
                    <DialogHeader>
                        <DialogTitle>Create Agent</DialogTitle>
                    </DialogHeader>

                    <TabNavigation currentTab={currentTab} onChange={setCurrentTab} />

                    <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)}>
                        {currentTab === "agent" && (
                            <AgentInfoTab
                                agentInfo={agentInfo}
                                setAgentInfo={setAgentInfo}
                                onCancel={handleCancel}
                                onNext={() => setCurrentTab("user")}
                            />
                        )}

                        {currentTab === "user" && (
                            <UserInfoTab
                                agentUser={agentUser}
                                setUserInfo={setUserInfo}
                                onBack={() => setCurrentTab("agent")}
                                onCancel={handleCancel}
                                onNext={() => setCurrentTab("image")}
                            />
                        )}
                        {currentTab === "image" && (
                            <ImageUploadTab
                                agentImage={agentImage}
                                setAgentImage={setAgentImage}
                                onBack={() => setCurrentTab("user")}
                                onCancel={handleCancel}
                                onNext={() => setCurrentTab("preview")}
                            />
                        )}
                        {currentTab === "preview" && (
                            <PreviewTab
                                agentInfo={agentInfo}
                                agentUser={agentUser}
                                agentImage={agentImage}
                                onBack={() => setCurrentTab("image")}
                                onCancel={handleCancel}
                                onSubmit={handleFinalSubmit}
                            />
                        )}
                    </Tabs>
                </DialogContent>
            </Dialog>
                    <Dialog
            open={isSubmittingDialogOpen}
            onOpenChange={setIsSubmittingDialogOpen}
        >
            <DialogContent className="text-center space-y-4 [&>button]:hidden" 
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="mb-0">
                    <DialogTitle className="m-auto text-xl">Creating New Agent</DialogTitle>
                </DialogHeader>

                <p className="text-muted-foreground text-lg my-1">
                    {submitStep}
                </p>

                <div className="flex justify-center mb-0">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
}