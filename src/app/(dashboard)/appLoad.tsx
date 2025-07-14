import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import CustomSidebar from "@/components/admin/CustomSidebar"
import { DashboardHeader } from "@/components/admin/DashboardHeader";

export default async function AppLoad({ children, defaultOpen }: { children: React.ReactNode, defaultOpen:boolean }) {
  
   
  return (
    <SidebarProvider  defaultOpen={defaultOpen}>
        <CustomSidebar/>
        <main className="w-full">
            <div>
                <DashboardHeader/>    
            </div>
            <div className="p-6">
                
                {children}
            </div>
        </main>
    </SidebarProvider>
  );
}
