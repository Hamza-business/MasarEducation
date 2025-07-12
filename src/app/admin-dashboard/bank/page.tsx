"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import AppShell from "@/components/app-shell";
import { Skeleton } from "@/components/ui/skeleton";

type Bank = {
  name: string;
  bank: string;
  tiban: string;
  diban: string;
  eiban: string;
};

export default function EditBankPage() {
    const [bankData, setBankData] = useState<Bank>({
        name: "",
        bank: "",
        tiban: "",
        diban: "",
        eiban: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchBank = async () => {
            const res = await fetch("/api/bank-info");
            const data = await res.json();
            setBankData(data);
            setLoading(false);
        };
        fetchBank();
    }, []);

    const handleChange = (field: keyof Bank, value: string) => {
        setBankData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        const res = await fetch("/api/bank-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bankData),
        });

        const result = await res.json();
        if (result.success) {
            alert("Bank info updated successfully");
        } else {
            alert("Error updating bank info");
        }
        setSaving(false);
    };


    return (
        <AppShell>
            <Container className="pt-22 pb-16">
                           
                <div className="max-w-xl mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold">Edit Bank & Payment Info</h2>
                    {!loading && ( 
                        <>
                            <div>
                                <Label className="mb-2">Bank Account Name *</Label>
                                <Input
                                    value={bankData["name"]}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="Enter Bank Account Name"
                                    className="rounded-sm"
                                />
                            </div>
                        
                            <div>
                                <Label className="mb-2">Enter Bank Name *</Label>
                                <Input
                                    value={bankData["bank"]}
                                    onChange={(e) => handleChange("bank", e.target.value)}
                                    placeholder="Enter Bank Name"
                                    className="rounded-sm"
                                />
                            </div>
                        </>
                    )}
                    {loading && (
                        <>
                            <Label className="mb-2">Bank Account Name *</Label>
                            <Skeleton className="h-9 w-1/1" />
                            <Label className="mb-2">Enter Bank Name *</Label>
                            <Skeleton className="h-9 w-1/1" />
                        </>
                    )}
                    <h3 className="text-base font-semibold mb-3">IBAN</h3>
                    {!loading && ( 
                        <>
                            <div className="mb-4">
                                <Label className="mb-2 text-gray-700 dark:text-gray-300">Turkish Lira IBAN *</Label>
                                <Input
                                    value={bankData["tiban"]}
                                    onChange={(e) => handleChange("tiban", e.target.value)}
                                    placeholder="Enter Turkish Lira IBAN"
                                    className="rounded-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <Label className="mb-2 text-gray-700 dark:text-gray-300">Dollars IBAN *</Label>
                                <Input
                                    value={bankData["diban"]}
                                    onChange={(e) => handleChange("diban", e.target.value)}
                                    placeholder="Enter Dollar IBAN"
                                    className="rounded-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <Label className="mb-2 text-gray-700 dark:text-gray-300">Euros IBAN *</Label>
                                <Input
                                    value={bankData["eiban"]}
                                    onChange={(e) => handleChange("eiban", e.target.value)}
                                    placeholder="Enter Euros IBAN"
                                    className="rounded-sm"
                                />
                            </div>

                            <Button onClick={handleSubmit} disabled={saving} className="px-6 rounded-sm">
                                {saving ? "Saving..." : "Save"}
                            </Button>
                        </>
                    )}
                    {loading && (
                        <>
                            <div className="mb-4">
                                <Label className="mb-2 text-gray-700 dark:text-gray-300">Turkish Lira IBAN *</Label>
                                <Skeleton className="h-9 w-1/1 rounded-sm" />
                            </div>
                            <div className="mb-4">
                                <Label className="mb-2 text-gray-700 dark:text-gray-300">Dollars IBAN *</Label>
                                <Skeleton className="h-9 w-1/1 rounded-sm" />
                            </div>
                            <div className="mb-4">
                                <Label className="mb-2 text-gray-700 dark:text-gray-300">Euros IBAN *</Label>
                                <Skeleton className="h-9 w-1/1 rounded-sm" />
                            </div>
                            <Skeleton className="h-9 w-20 rounded-sm" />
                        </>
                    )}
                </div>
            
                
            </Container>
        </AppShell>
    );
}
