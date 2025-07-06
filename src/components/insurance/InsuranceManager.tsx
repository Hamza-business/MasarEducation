'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CgAddR } from "react-icons/cg";
import InsuranceFormDialog from "./InsuranceFormDialog";
import InsuranceList from "./InsuranceList";
import { InsurancePackage, PriceRange } from "@/types/insurance";
import InsuranceCardSkeleton from "./InsuranceCardSkeleton";
import { planActivationToggleFailed, planActivationToggleSuccess, planDeletionFailed, planDeletionSuccess, planFetchFailed, planStoreFailed, planStoreSuccess } from "../notifications/toast";


export default function InsuranceManager() {
  const [packages, setPackages] = useState<InsurancePackage[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedPackage, setSelectedPackage] = useState<InsurancePackage | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing insurance packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/insurances");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        planFetchFailed();
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleCreateClick = () => {
    setMode("create");
    setSelectedPackage(null);
    setOpen(true);
  };

  const handleEditClick = (pkg: InsurancePackage) => {
    setMode("edit");
    setSelectedPackage(pkg);
    setOpen(true);
  };

  const handleToggleActive = async (id: number, desiredState: boolean) => {
    try {
      const res = await fetch(`/api/insurances/${id}/toggle-active`, {
        method: 'PATCH',
        body: JSON.stringify({ active: desiredState }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to update active status');
      planActivationToggleSuccess(desiredState);

      const updatedPkg = await res.json();

      setPackages((prev) =>
        prev.map((p) => (p.id === id ? updatedPkg : p))
      );
    } catch (error) {
      planActivationToggleFailed(desiredState);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/insurances/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setPackages((prev) => prev.filter((p) => p.id !== id));
      planDeletionSuccess();
    } catch (err) {
      err;
      planDeletionFailed();
    }
  };

  const handleSave = async (newPkg: InsurancePackage & { prices: PriceRange[] }) => {
      try {
          if (mode === "create") {
              const res = await fetch("/api/insurances", {
                  method: "POST",
                  headers: {
                  "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newPkg),
              });

              if (!res.ok) {
                  const errText = await res.text();
                  throw new Error(errText);
              }

              const saved = await res.json();
              // setPackages((prev) => [...prev, saved]);
          } else {
              const res = await fetch(`/api/insurances/${newPkg.id}`, {
                  method: "PUT",
                  headers: {
                  "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newPkg),
              });

              if (!res.ok) {
                  const errText = await res.text();
                  throw new Error(errText);
              }

              // setPackages((prev) => prev.map((p) => (p.id === (await res.json()).id ? await res.json() : p)));
          }
          planStoreSuccess(newPkg.name);
          setOpen(false);
      } catch (err) {
          planStoreFailed(newPkg.name);
      }
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Active Insurance Price Plans</h1>
        <Button onClick={handleCreateClick}>
          <CgAddR className="mr-2" />
          Add New Price Plan
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <InsuranceCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <InsuranceList
          packages={packages}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
          status={true}
        />
      )}
      <hr className="my-8"/>


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Unactive Insurance Price Plans</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <InsuranceCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <InsuranceList
          packages={packages}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
          status={false}
        />
      )}


      <InsuranceFormDialog
        open={open}
        onClose={() => setOpen(false)}
        mode={mode}
        defaultValues={selectedPackage ?? undefined}
        onSubmit={handleSave}
      />
    </div>
  );
}
