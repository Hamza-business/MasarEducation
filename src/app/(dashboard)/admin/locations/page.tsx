"use client";
import DistrictManager from '@/components/locations/DistrictManager';
import NeighbourhoodManager from '@/components/locations/NeighbourhoodManager';
import RegionManager from '@/components/locations/RegionManager';
import { useState } from 'react';
import type { Region, District, Neighbourhood } from '@/types/all';

export default function AreaManagementPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<Neighbourhood | null>(null);
  selectedNeighbourhood;

  return (
        <div className="py-5 grid grid-cols-1 md:grid-cols-3 w-full gap-6">
            <RegionManager 
                onRegionSelect={(region)=>{
                    setSelectedRegion(region);
                    setSelectedDistrict(null);
                    setSelectedNeighbourhood(null);
                }}
                clear={()=>{
                    setSelectedRegion(null);
                    setSelectedDistrict(null);
                    setSelectedNeighbourhood(null);
                }}
            />
            <DistrictManager
                selectedRegion={selectedRegion}
                onDistrictSelect={(district) => {
                    setSelectedDistrict(district);
                    setSelectedNeighbourhood(null);
                }}
                clear={()=>{
                    setSelectedDistrict(null);
                    setSelectedNeighbourhood(null);
                }}
            />
            <NeighbourhoodManager 
                selectedDistrict={selectedDistrict}
                selectedRegion={selectedRegion} 
                clear={()=>{
                    setSelectedNeighbourhood(null);
                }}
            />
        </div>
    );
}
