'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DistrictList from '@/components/locations/District_Manager/DistrictList';
import type { Region, District } from '@/types/locations';
import { toastDistrictCreationSuccess, toastDistrictCreationFailed, toastDistrictFetchFailed } from '@/components/notifications/toast';

export default function DistrictManager({
  selectedRegion,
  onDistrictSelect,
}: {
  selectedRegion: Region | null;
  onDistrictSelect: (district: District) => void;
}) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setDistricts([]);
    if (selectedRegion) {
      fetchDistricts();
    } else {
      setSelectedId(null);
      setDistricts([]);
    }
  }, [selectedRegion]);

  async function fetchDistricts() {
    try {
      if (!selectedRegion) return;

      setLoading(true);

      const res = await fetch(`/api/districts?region=${selectedRegion.id}`);

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to fetch districts: ${errorBody}`);
      }

      const data = await res.json();
      setDistricts(data);
    } catch (err: any) {
      toastDistrictFetchFailed();
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!selectedRegion) return;

    try {
      setCreating(true);

      const res = await fetch('/api/districts', {
        method: 'POST',
        body: JSON.stringify({
          name: search,
          region: selectedRegion.id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to create district: ${errorBody}`);
      }

      const newDistrict = await res.json();

      setDistricts((prev) => [...prev, newDistrict]);
      setSearch('');
      setSelectedId(newDistrict.id);
      onDistrictSelect(newDistrict);

      toastDistrictCreationSuccess(search, selectedRegion.name);
    } catch (err: any) {
      toastDistrictCreationFailed(search);
    } finally {
      setCreating(false);
    }
  }

  const filtered = districts.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const notFound = search && filtered.length === 0;

  return (
    <div className="p-4 border rounded-md shadow bg-white dark:bg-zinc-900 w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Districts</h2>
        <span className="text-sm text-muted-foreground">
          {districts.length}
        </span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search or add district"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='rounded-sm'
        />
        <Button
          disabled={!notFound || creating}
          onClick={handleAdd}
          className="bg-[#20B2AA] hover:bg-[#03c1b7] rounded-sm text-xl px-3 cursor-pointer"
        >+
        </Button>
      </div>

      <DistrictList
        loading={loading}
        districts={filtered}
        selectedId={selectedId}
        search={search}
        selectedRegion={selectedRegion}
        onSelect={(district) => {
          setSelectedId(district.id);
          onDistrictSelect(district);
        }}
      />
    </div>
  );
}
