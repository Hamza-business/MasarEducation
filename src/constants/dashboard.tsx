import { CiBank } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { LiaFileSignatureSolid } from "react-icons/lia";

export const links:string[] = ["bank-infomration", "locations", "services", "insurance"];
export const locations:string[] = ["locations"];
export const services:string[] = ["insurance"];
export const bank:string[] = ["bank-infomration"];

export const linksInfo = {
    "admin-dashboard":{
        href: "/admin-dashboard",
        label: "Admin Dashboard",
        icon: <MdOutlineAdminPanelSettings className="fn"/>
    },
    "bank-infomration": { 
        href: "/admin-dashboard/bank-infomration", 
        label: "Bank Information", 
        icon: <CiBank className="fn"/>
    },
    locations: { 
        href: "/admin-dashboard/locations", 
        label: "Locations", 
        icon: <IoLocationOutline className="fn"/>
    },
    services: { 
        href: "/admin-dashboard/services", 
        label: "Services", 
        icon: <TbPackages className="fn"/>
    },
    insurance: { 
        href:  "/admin-dashboard/services/insurance", 
        label:  "Insurance", 
        icon: <LiaFileSignatureSolid className="fn"/>
    },
};