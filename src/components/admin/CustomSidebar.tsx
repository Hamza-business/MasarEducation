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
import {bankItems, ordersItems, servicesItems, locationsItems, agentsItems} from "@/constants/dashboard"


export default function CustomSidebar({ rtl }: { rtl?: boolean }) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Bank Information</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {bankItems.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={item?.href}>
                                            {item?.icon}
                                            <span>{item?.label}</span>
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
                            {locationsItems.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={item?.href}>
                                            {item?.icon}
                                            <span>{item?.label}</span>
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
                            {servicesItems.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={item?.href}>
                                            {item?.icon}
                                            <span>{item?.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Orders Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {ordersItems.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={item?.href}>
                                            {item?.icon}
                                            <span>{item?.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Agents</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {agentsItems.map((item, i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild>
                                        <a href={item?.href}>
                                            {item?.icon}
                                            <span>{item?.label}</span>
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