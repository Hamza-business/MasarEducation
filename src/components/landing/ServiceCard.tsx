import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  isPrimary?: boolean;
}

const ServiceCard = ({ icon: Icon, title, onClick, isPrimary = false }: ServiceCardProps) => {
  return (
    <Card className={`group p-8 transition-all duration-300 hover:scale-[1.02] border relative overflow-hidden ${
      isPrimary 
        ? 'bg-[#103c5c] text-white border-[#e85f5e]' 
        : 'bg-white border-[#dedede] hover:border-[#e85f5e]'
    }`}>
      <Button
        onClick={onClick}
        className="w-full h-auto p-6 relative bg-[#ffffff] hover:bg-[#f6f6f9] border-[#aaaaaa]" 
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full transition-colors ${
            isPrimary 
              ? 'bg-[#fce4de] group-hover:bg-[#f1c5b9]' 
              : 'bg-[#feebe6] group-hover:bg-[#fad3c8] '
          }`}>
            <Icon className={`h-16 w-16 ${
              isPrimary ? 'text-[#103c5c]' : 'text-[#e85f5e]'
            }`} />
          </div>
          <h3 className={`text-2xl font-bold transition-colors ${
            isPrimary 
              ? 'text-[#103c5c] group-hover:text-masar-navy/90' 
              : 'text-[#103c5c] group-hover:text-[#e85f5e]'
          }`}>{title}</h3>
        </div>
      </Button>
    </Card>
  );
};



export default ServiceCard;