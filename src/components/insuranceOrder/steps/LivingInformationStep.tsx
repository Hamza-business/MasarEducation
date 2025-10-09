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
import { useProvinces, useDistricts, useNeighborhoods } from "@/hooks/useTurkeyLocations";
import {useTranslations} from 'next-intl';

type Props = {
  application: InsuranceApplication;
  regions: string[];
  setRegions: (regions: string[])=> void;
  setApplication: (app: InsuranceApplication) => void;
  onNext: (validate?: () => string[]) => void;
  onBack: () => void;
};

export default function LivinginformationStep({application, regions, setRegions, setApplication, onBack, onNext }: Props) {
  const t = useTranslations("livinginfo");
  
  // Use SWR hooks for data fetching with automatic retry
  const { provinces, isLoading: provincesLoading, error: provincesError, isRetrying: provincesRetrying, mutate: mutateProvinces } = useProvinces();
  const { districts, isLoading: districtsLoading, error: districtsError, isRetrying: districtsRetrying, mutate: mutateDistricts } = useDistricts(application.region || null);
  const { neighborhoods, isLoading: neighborhoodsLoading, error: neighborhoodsError, isRetrying: neighborhoodsRetrying, mutate: mutateNeighborhoods } = useNeighborhoods(application.district || null);

  // Handle errors and show appropriate toasts - only after all retries have failed
  useEffect(() => {
    if (provincesError && !provincesRetrying) {
      console.error('Failed to fetch provinces after all retries:', provincesError);
      toastRegionFetchFailed();
    }
  }, [provincesError, provincesRetrying]);

  useEffect(() => {
    if (districtsError && !districtsRetrying) {
      console.error('Failed to fetch districts after all retries:', districtsError);
      toastDistrictFetchFailed();
    }
  }, [districtsError, districtsRetrying]);

  useEffect(() => {
    if (neighborhoodsError && !neighborhoodsRetrying) {
      console.error('Failed to fetch neighborhoods after all retries:', neighborhoodsError);
      toastNeighborhoodFetchFailed();
    }
  }, [neighborhoodsError, neighborhoodsRetrying]);

  // Update regions in parent component when provinces are loaded
  useEffect(() => {
    if (provinces && provinces.length > 0) {
      setRegions(provinces);
    }
  }, [provinces, setRegions]);

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
            <Label className="mb-2">{t("Region")} *</Label>
            <Select
              value={application.region?.toString() ?? ""}
              onValueChange={(val) => handleRegionChange(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={
                  provincesLoading ? "Loading provinces..." : 
                  provincesRetrying ? "Retrying..." :
                  "Select region"
                } />
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
              <Label className="mb-2">{t("District")} *</Label>
              <Select
                  value={application.district?.toString() ?? ""}
                  onValueChange={(val) => handleDistrictChange(val)}
                  disabled={!application.region}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={
                        districtsLoading ? "Loading districts..." : 
                        districtsRetrying ? "Retrying..." :
                        application.region ? "Select district" : "Select region first"
                      } />
                  </SelectTrigger>
                  <SelectContent>
                      {districts?.map((d, inx) => (
                      <SelectItem key={inx} value={d}>
                          {d}
                      </SelectItem>
                      )) || []}
                  </SelectContent>
              </Select>
          </div>

          {/* Neighbourhood */}
          <div>
              <Label className="mb-2">{t("Neighbourhood")} *</Label>
              <Select
                  value={application.neighbourhood?.toString() ?? ""}
                  onValueChange={(val) => handleNeighbourhoodChange(val)}
                  disabled={!application.district}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder={
                        neighborhoodsLoading ? "Loading neighborhoods..." : 
                        neighborhoodsRetrying ? "Retrying..." :
                        application.district ? "Select neighbourhood" : "Select district first"
                      } />
                  </SelectTrigger>
                  <SelectContent>
                      {neighborhoods?.map((n, inx) => (
                      <SelectItem key={inx} value={n}>
                          {n}
                      </SelectItem>
                      )) || []}
                  </SelectContent>
              </Select>
          </div>
      </div>

      {/* Address Fields */}
      <div>
        <Label className="mb-2">{t("Street")} *</Label>
        <Input
          value={application.street}
          onChange={(e) => setApplication({ ...application, street: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <Label className="mb-2">{t("Building")} *</Label>
            <Input
            value={application.building}
            onChange={(e) => setApplication({ ...application, building: e.target.value })}
            />
        </div>
        <div>
            <Label className="mb-2">{t("Apartment")} *</Label>
            <Input
            value={application.appartment}
            onChange={(e) => setApplication({ ...application, appartment: e.target.value })}
            />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="text-base w-30 h-10"><IoChevronBackOutline />{t("Back")}</Button>
        <Button onClick={()=>{onNext(() => validateInsuranceApplication(application))}} className="text-base w-30 h-10">{t("Next")}<GrFormNext /></Button>
      </div>
    </div>
  );
}
