"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { InsuranceApplication, PersonInfo, PlanWithPrice } from "@/types/all";
import { Button } from "@/components/ui/button";
import { validateInsuranceApplication } from "@/components/validations/validateInsuranceOrder";
import PlanSelector from "../elements/planSelector";
import { GrFormNext } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";

type Props = {
  personInfo: PersonInfo;
  application: InsuranceApplication;
  regions: { id: number; name: string }[];
  fn: () => void;
  availablePlans: PlanWithPrice[];
  setApplication: (app: InsuranceApplication) => void;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

export default function LivinginformationStep({ personInfo, application, regions, fn, availablePlans, setApplication, onBack, onNext }: Props) {
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);
  const [neighbourhoods, setNeighbourhoods] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fn();
  }, [])

  // Load districts on region change, reset downstream
  useEffect(() => {
    if (!application.region) return setDistricts([]);

    fetch(`/api/districts?region=${application.region}`)
      .then((res) => res.json())
      .then((list) => {
        setDistricts(list);
      })
      .catch(console.error);
  }, [application.region]);

  // Load neighbourhoods on district change
  useEffect(() => {
    if (!application.district) return setNeighbourhoods([]);

    fetch(`/api/neighbourhoods?district=${application.district}`)
      .then((res) => res.json())
      .then((list) => {
        setNeighbourhoods(list);
      })
      .catch(console.error);
  }, [application.district]);

  const handleRegionChange = (id: number) => {
    setApplication({ ...application, region: id, district: null, neighbourhood: null });
  };

  const handleDistrictChange = (id: number) => {
    setApplication({ ...application, district: id, neighbourhood: null });
  };

  const handleNeighbourhoodChange = (id: number) => {
    setApplication({ ...application, neighbourhood: id });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Region */}
          <div>
            <Label className="mb-2">Region *</Label>
            <Select
              value={application.region?.toString() ?? ""}
              onValueChange={(val) => handleRegionChange(Number(val))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r.id} value={r.id.toString()}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* District */}
          <div>
              <Label className="mb-2">District *</Label>
              <Select
                  value={application.district?.toString() ?? ""}
                  onValueChange={(val) => handleDistrictChange(Number(val))}
                  disabled={!application.region}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={application.region ? "Select district" : "Select region first"} />
                  </SelectTrigger>
                  <SelectContent>
                      {districts.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()}>
                          {d.name}
                      </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>

          {/* Neighbourhood */}
          <div>
              <Label className="mb-2">Neighbourhood *</Label>
              <Select
                  value={application.neighbourhood?.toString() ?? ""}
                  onValueChange={(val) => handleNeighbourhoodChange(Number(val))}
                  disabled={!application.district}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={application.district ? "Select neighbourhood" : "Select district first"} />
                  </SelectTrigger>
                  <SelectContent>
                      {neighbourhoods.map((n) => (
                      <SelectItem key={n.id} value={n.id.toString()}>
                          {n.name}
                      </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
      </div>

      {/* Address Fields */}
      <div>
        <Label className="mb-2">Street *</Label>
        <Input
          value={application.street}
          onChange={(e) => setApplication({ ...application, street: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <Label className="mb-2">Building No. *</Label>
            <Input
            value={application.building}
            onChange={(e) => setApplication({ ...application, building: e.target.value })}
            />
        </div>
        <div>
            <Label className="mb-2">Apartment No. *</Label>
            <Input
            value={application.appartment}
            onChange={(e) => setApplication({ ...application, appartment: e.target.value })}
            />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />Back</Button>
        <Button onClick={()=>{onNext(() => validateInsuranceApplication(application))}} className="text-base w-30 h-10">Next<GrFormNext /></Button>
      </div>
    </div>
  );
}
