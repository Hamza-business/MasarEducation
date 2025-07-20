import { CiBank } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { LiaFileSignatureSolid } from "react-icons/lia";
import { FaSignature } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";

export const links:string[] = ["bank-infomration", "locations", "services", "insurance"];
export const locations:string[] = ["locations"];
export const services:string[] = ["insurance"];
export const bank:string[] = ["bank-infomration"];
export const orders:string[] = ["insurance"];
export const agents:string[] = ["Manage Agents"];

export const linksInfo = {
    "admin":{
        href: "",
        label: "Admin Dashboard",
        icon: <MdOutlineAdminPanelSettings className="fn"/>
    },
    "bank-infomration": { 
        href: "/bank-infomration", 
        label: "Bank Information", 
        icon: <CiBank className="fn"/>
    },
    locations: { 
        href: "/locations", 
        label: "Locations", 
        icon: <IoLocationOutline className="fn"/>
    },
    services: { 
        href: "/services", 
        label: "Services", 
        icon: <TbPackages className="fn"/>
    },
    insurance: { 
        href:  "/services/insurance", 
        label:  "Insurance", 
        icon: <LiaFileSignatureSolid className="fn"/>
    },
    orders: {
        href:  "/orders", 
        label:  "Orders", 
        icon: <LiaFileSignatureSolid className="fn"/>
    },
    "Manage Agents": {
        href:  "/agents", 
        label:  "Manage Agents", 
        icon: <GoOrganization className="fn"/>
    },
    "agent": {
        href:  "", 
        label:  "Agent Dashboard", 
        icon: <GoOrganization className="fn"/>
    },
    "agents": {
        href:  "/agents", 
        label:  "Manage My Agents", 
        icon: <GoOrganization className="fn"/>
    }
};

export const bankItems = [
    { 
        href: "/bank-infomration", 
        label: "Bank Information", 
        icon: <CiBank className="fn"/>
    },
];
export const locationsItems = [
    { 
        href: "/locations", 
        label: "Locations", 
        icon: <IoLocationOutline className="fn"/>
    },
];
export const servicesItems = [
    { 
        href: "/services/insurance", 
        label: "Insurance", 
        icon: <LiaFileSignatureSolid className="fn"/>
    }
];
export const ordersItems = [
    { 
        href:  "/orders/insurance", 
        label:  "Insurance Orders", 
        icon: <FaSignature className="fn"/>
    },
]
export const agentsItems = [
    { 
        href:  "/agents", 
        label:  "Manage Agents", 
        icon: <GoOrganization className="fn"/>
    },
]