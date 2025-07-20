// components/layout/DashboardHeader.tsx
"use client";

import { useSidebar } from "@/context/sidebar-context";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import {links, linksInfo, locations, services, bank} from "@/constants/dashboard"
import { IoIosArrowForward } from "react-icons/io";

export function DashboardHeader() {
  let pathname = usePathname().split("/");
  const segments = pathname.filter(Boolean);
  let pathurl = "";
  if(pathname[1] == "admin"){
      pathurl = pathname[1]
  } else if (pathname[1] == "agent"){
      pathurl = `${pathname[1]}/${pathname[2]}`;
      pathname.splice(2,1);
  }

  return (
    <div className="flex items-center justify-start px-4 py-3 border-b bg-white dark:bg-black">
        <SidebarTrigger />
        <div data-orientation="vertical" role="none" data-slot="separator" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 mx-2 mr-3"></div>
        <div className="text-sm flex items-center">
          {segments.map((s, i) => (
            <span key={i}>
                {linksInfo[s as keyof typeof linksInfo] && (
                    <>
                        <a href={`/${pathurl}${linksInfo[s as keyof typeof linksInfo].href}`} className={`capitalize ${i+1 < segments.length ? "text-muted-foreground" : "text-gray-900 dark:text-gray-100"}`}> {linksInfo[s as keyof typeof linksInfo]?.label}</a>
                        {
                          i+1 < segments.length ? <span className="inline-flex mx-2"><IoIosArrowForward/></span> : ""
                        }
                    </>
                )}
            </span>
          ))}
        </div>
        {/* <div className="w-10" /> */}
    </div>
  );
}

