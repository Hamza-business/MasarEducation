import { Button } from "@/components/ui/button";
import type { agentImageType, PriceRange } from "@/types/all";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { UploadIcon } from "lucide-react";
import { MdNavigateNext } from "react-icons/md";
import { toastValidationErorr } from "@/components/notifications/toast";

type Props = {
    agentImage:agentImageType | null,
    setAgentImage: (agentImage:agentImageType)=>void;
    onBack: () => void;
    onCancel: () => void;
    onNext: () => void;
};

export default function ImageUploadTab({
    agentImage,
    setAgentImage,
    onBack,
    onCancel,
    onNext,
}: Props) {

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const buffer = await file.slice(0, 4).arrayBuffer();
        const signature = Array.from(new Uint8Array(buffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
    
        const allowedSignatures = {
            png: "89504E47", // PNG
            jpg: "FFD8FF",   // JPG
        };
    
        const isValid = Object.values(allowedSignatures).some((sig) =>
            signature.startsWith(sig)
        );
    
        if (!isValid) {
            toastValidationErorr("Invalid file type. Only PNG, JPG files are allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = (reader.result as string).split(",")[1];
            setAgentImage({
                id:0,
                name: file.name,
                mimetype: file.type,
                data: base64
            });
        };
        reader.readAsDataURL(file);
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Label>Upload Agent Logo {"(w 3000px, h 530)"}</Label>
                <div className="cursor-pointer border-2 border-dashed rounded-md px-4 py-8 flex flex-col items-center justify-center text-sm text-muted-foreground hover:bg-accent transition"
                    onClick={triggerFileInput}>
                    <UploadIcon className="mb-2 h-6 w-6" />
                    {agentImage?.name ? (
                        <span className="text-blue-500 font-medium">{agentImage.name}</span>
                    ) : (
                        <span className="text-center">Tap here to upload your Receipt.<br/> Make sure image has 3000px width and 530px height for best fit!</span>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    id="agentlogo"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PNG, JPG, JPEG. File is validated using its signature.
                </p>
                {agentImage?.data && (
                    <img
                        src={`data:${agentImage.mimetype};base64,${agentImage.data}`}
                        alt="Preview"
                        className="w-full object-cover rounded border"
                    />
                )}
            </div>

            <div className="flex justify-between mt-2">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onCancel}> Cancel</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onBack}>
                    <IoIosArrowBack />
                    Back
                  </Button>
                  <Button onClick={onNext}>Next <MdNavigateNext /></Button>
                </div>
            </div>
        </div>
    );
}