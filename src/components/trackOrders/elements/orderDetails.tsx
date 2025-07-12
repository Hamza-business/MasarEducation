import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { InsuranceOrderDetails, oredrStatus } from "@/types/all";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LuPackageCheck, LuPackageOpen, LuPackageX } from "react-icons/lu";
import { PiPackageDuotone } from "react-icons/pi";
import InsuranceFiles from "./insuranceFiles";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

const statusMap: Record<oredrStatus, { label: string; color: string, stl:string, icon: ReactNode }> = {
  "pending": { label: "Pending", color: "bg-gray-200 text-gray-700", stl:"bg-gray-100 text-gray-800 border-gray-500", icon: <LuPackageOpen className="h-7 w-7"/>},
  "under review": { label: "Under Review", color: "bg-yellow-100 text-yellow-900", stl:"bg-yellow-100 text-yellow-800 border-yellow-500", icon: <PiPackageDuotone className="h-7 w-7"/>},
  "completed": { label: "Completed", color: "bg-green-100 text-green-800", stl:"bg-green-100 text-green-800 border-green-800", icon: <LuPackageCheck className="h-7 w-7"/> },
  "rejected": { label: "Rejected", color: "bg-red-100 text-red-800", stl:"bg-red-100 text-red-800 border-red-500", icon: <LuPackageX className="h-7 w-7"/> },
};

function convertDate(dt:Timestamp|Date|string):string{
    const issuedDate = new Date(dt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return issuedDate;
}

export default function OrderDetails({orderdetails}:{orderdetails:InsuranceOrderDetails}) {
    
  return (
    <div className="grid gap-4 border border-gray-200 rounded-sm p-6 dark:border-gray-800">
        <div className="flex items-center justify-between stack-on-xs">
            <div className="flex items-center gap-4">
                <div className={cn("rounded-sm flex items-center justify-center aspect-square w-12 border-1", statusMap[orderdetails.status as oredrStatus].stl)}>
                    {statusMap[orderdetails.status as oredrStatus].icon}                    
                </div>
                <div>
                    <div className="font-medium">Package #{orderdetails?.trackCode}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Order Issued on {convertDate(orderdetails?.created_at)}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 vs-full">
                <Badge className={cn("text-xs rounded-sm px-4 py-1 w-full", statusMap[orderdetails.status as oredrStatus].color)}>
                    {statusMap[orderdetails.status as oredrStatus].label}
                </Badge>
            </div>
        </div>
        <div className="grid gap-3">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Plan Price</div>
                <div className="font-medium">{orderdetails?.price} TL</div>
            </div>
            
            {(orderdetails.status as oredrStatus === "completed") && (
                <>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm text-muted-foreground">Completed On</h3>
                        <p className="text-base font-medium">{orderdetails?.finish_date && (convertDate(orderdetails?.finish_date))}</p>
                    </div>
                    <div className="flex justify-between flex-col">
                        <h3 className="text-sm text-muted-foreground mb-2">Insurance Files</h3>
                        <InsuranceFiles orderId={orderdetails.id}/>
                    </div>
                </>
            )}
            {(orderdetails.status as oredrStatus === "rejected") && (
                <>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm text-muted-foreground">Rejected On</h3>
                        <p className="text-base font-medium">{orderdetails?.finish_date && (convertDate(orderdetails?.finish_date))}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">Rejection Message:</h3>
                        <div className="bg-red-50 dark:bg-neutral-800 dark:text-red-200 p-4 rounded-sm text-sm text-gray-800 border border-red-300 dark:border-red-600">
                            {orderdetails?.msg}
                            <br />
                            Please contact our <a href="/support" className="underline font-medium">Support Team</a> for help.
                        </div>
                    </div>
                </>
            )}
            {(orderdetails.status as oredrStatus !== "rejected") && (orderdetails.status as oredrStatus !== "completed") && (
                <p className="text-sm italic text-muted-foreground">
                    Your Insurance files will be available after completion.
                </p>
            )}
        </div>
    </div>
  )
}