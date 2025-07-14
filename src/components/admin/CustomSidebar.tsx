"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, PackageSearch, Users } from "lucide-react";
import {links, linksInfo, locations, services, bank} from "@/constants/dashboard"
import { CiBank } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { TbPackages } from "react-icons/tb";


export default function CustomSidebar({ rtl }: { rtl?: boolean }) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Bank Information</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {bank.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={linksInfo[item as keyof typeof linksInfo]?.href}>
                                            {linksInfo[item as keyof typeof linksInfo]?.icon}
                                            <span>{linksInfo[item as keyof typeof linksInfo]?.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>locations Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {locations.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={linksInfo[item as keyof typeof linksInfo]?.href}>
                                            {linksInfo[item as keyof typeof linksInfo]?.icon}
                                            <span>{linksInfo[item as keyof typeof linksInfo]?.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Services Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {services.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={linksInfo[item as keyof typeof linksInfo]?.href}>
                                            {linksInfo[item as keyof typeof linksInfo]?.icon}
                                            <span>{linksInfo[item as keyof typeof linksInfo]?.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}