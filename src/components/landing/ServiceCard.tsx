import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  link: string;
  isPrimary?: boolean;
}

const ServiceCard = ({ icon: Icon, title, link, isPrimary = false}: ServiceCardProps) => {
  return (
    <a href={link}>
    <Card className={`group p-8 transition-all duration-300 hover:scale-[1.02] border relative overflow-hidden rounded-sm bg-white border-[#dedede] hover:border-[#e85f5e]`}>
      
        <Button
        className="w-full h-auto p-6 relative bg-[#ffffff] hover:bg-[#f6f6f9] border-[#aaaaaa] rounded-sm" 
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full transition-colors ${
            isPrimary 
              ? 'bg-[#fce4de] group-hover:bg-[#f1c5b9]' 
              : 'bg-[#feebe6] group-hover:bg-[#fad3c8] '
          }`}>
            <Icon className={`h-16 w-16 'text-[#e85f5e]`} />
          </div>
          <h3 className={`text-2xl font-bold transition-colors text-[#103c5c] group-hover:text-[#e85f5e]`}>{title}</h3>
        </div>
      </Button>
    </Card>
    </a>
  );
};



export default ServiceCard;