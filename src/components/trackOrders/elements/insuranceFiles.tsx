import { FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ReportFile = {
  id: number;
  name: string;
};

export default function InsuranceFiles({orderId}:{orderId:number}) {

    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState<ReportFile[]>([]);
    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/order/reports/insurance?orderId=${orderId}`);
                const data = await res.json();
                setFiles(data);
            } catch (err) {
                console.error("Failed to fetch report files");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, [orderId]);

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col sm:flex-row gap-3">
                    {[1, 2].map((n) => (
                        <div key={n} className="h-10 w-40 rounded-md bg-muted animate-pulse"/>
                    ))}
                </div>
            ) : files.length > 0 ? (
                <div className="flex flex-col sm:flex-row gap-x-3 gap-y-0">
                    {files.map((file, i) => (
                        <Button key={file.id} className="text-sm px-4 py-4 mt-2">
                            <a href={`/api/order/reports/insurance/${file.id}`} download={file.name} className="flex justify-between items-center gap-2 w-full">
                                Insurance {i+1} <FaDownload />
                            </a>
                        </Button>
                    ))}
                </div>
            ) : (
                <div className="bg-red-50 dark:bg-zinc-900 dark:text-red-200 p-4 rounded-sm text-sm text-gray-800 border border-red-300 dark:border-red-600">
                    No insurance file(s) available.
                    <br />
                    Please contact our{" "}
                    <Link href="mailto:support@masartr.com" className="underline font-medium">
                        Support Team
                    </Link>{" "}
                    for any help.
                </div>
            )}
        </>   
    )
}