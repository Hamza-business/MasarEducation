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
import { toastDistrictFetchFailed, toastNeighborhoodFetchFailed, toastRegionFetchFailed } from "@/components/notifications/toast";
import { getDistricts, getNeighbourhoods, getRegions } from "@/lib/locations";

type Props = {
  application: InsuranceApplication;
  regions: string[];
  setRegions: (regions: string[])=> void;
  setApplication: (app: InsuranceApplication) => void;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

export default function LivinginformationStep({application, regions, setRegions, setApplication, onBack, onNext }: Props) {
  const [districts, setDistricts] = useState<string[]>([]);
  const [neighbourhoods, setNeighbourhoods] = useState<string[]>([]);

  useEffect(() => {
    getRegions(setRegions);
    // fetch("https://turkiyeapi.dev/api/v1/provinces")
    //   .then((res) => res.json())
    //   .then((data) => {
    //       const namesOnly = data.data.map((province: { name: string }) => province.name);
    //       setRegions(namesOnly);
    //   })
    //   .catch((error)=>{
    //       toastRegionFetchFailed();
    //   });
  }, []);

  // Load districts on region change, reset downstream
  useEffect(() => {
    if (!application.region) return setDistricts([]);

    getDistricts(application.region, setDistricts)
    // fetch(`https://turkiyeapi.dev/api/v1/districts?province=${application.region}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //       const namesOnly = data.data.map((province: { name: string }) => province.name);
    //       setDistricts(namesOnly);
    //   })
    //   .catch((error)=>{
    //     toastDistrictFetchFailed();
    // });
  }, [application.region]);

  // Load neighbourhoods on district change
  useEffect(() => {
    if (!application.district) return setNeighbourhoods([]);

    getNeighbourhoods(application.district, setNeighbourhoods);
    // fetch(`/api/locations/neighbourhoods?district=${application.district}`)
    //   .then((res) => res.json())
    //   .then((list) => {
    //     setNeighbourhoods(list);
    //   })
    //   .catch((error)=>{
    //     toastNeighborhoodFetchFailed();
    //   });
  }, [application.district]);

  const handleRegionChange = (val: string) => {
    setApplication({ ...application, region: val, district: "", neighbourhood: "" });
  };

  const handleDistrictChange = (val: string) => {
    setApplication({ ...application, district: val, neighbourhood: "" });
  };

  const handleNeighbourhoodChange = (val: string) => {
    setApplication({ ...application, neighbourhood: val });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Region */}
          <div>
            <Label className="mb-2">Region *</Label>
            <Select
              value={application.region?.toString() ?? ""}
              onValueChange={(val) => handleRegionChange(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r, inx) => (
                  <SelectItem key={inx} value={r}>
                    {r}
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
                  onValueChange={(val) => handleDistrictChange(val)}
                  disabled={!application.region}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={application.region ? "Select district" : "Select region first"} />
                  </SelectTrigger>
                  <SelectContent>
                      {districts.map((d, inx) => (
                      <SelectItem key={inx} value={d}>
                          {d}
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
                  onValueChange={(val) => handleNeighbourhoodChange(val)}
                  disabled={!application.district}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={application.district ? "Select neighbourhood" : "Select district first"} />
                  </SelectTrigger>
                  <SelectContent>
                      {neighbourhoods.map((n, inx) => (
                      <SelectItem key={inx} value={n}>
                          {n}
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
