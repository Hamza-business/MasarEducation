'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DistrictList from '@/components/locations/District_Manager/DistrictList';
import type { Region, District } from '@/types/locations';
import { 
  toastDistrictCreationSuccess, 
  toastDistrictCreationFailed, 
  toastDistrictFetchFailed, 
  toastDistrictDeletionSuccess,
  toastDistrictDeletionFailed,
  toastDistrictUpdateSuccess,
  toastDistrictUpdateFailed
} from '@/components/notifications/toast';

export default function DistrictManager({
  selectedRegion,
  onDistrictSelect,
  clear
}: {
  selectedRegion: Region | null;
  onDistrictSelect: (district: District) => void;
  clear: () => void;
}) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setSelectedName('');
    clear()
    if (selectedRegion) {
      fetchDistricts();
    } else {
      setSelectedId(null);
      setDistricts([]);
    }
  }, [selectedRegion]);


  async function handleRenameDistrict(id: number, newName: string) {
    try {
      const res = await fetch(`/api/districts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error("Rename failed");

      toastDistrictUpdateSuccess(selectedName);

      setSelectedName(newName);

      setDistricts((prev) =>
        prev.map((r) => (r.id === id ? { ...r, name: newName } : r))
      );
    } catch {
      toastDistrictUpdateFailed(selectedName);
    }
  }


  const handleDeleteDistrict = async (id: number) => {
    try {
      const res = await fetch(`/api/districts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toastDistrictDeletionSuccess(selectedName);

      setDistricts((prev) => prev.filter((r) => r.id !== id));
      clear();
      setSelectedId(null);
      setSelectedName('');
    } catch (err) {
      err;
      toastDistrictDeletionFailed(selectedName);
    }
  };

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
      toastDistrictCreationSuccess(selectedName, selectedRegion.name);

      setDistricts((prev) => [...prev, newDistrict]);
      setSelectedName(search);
      setSelectedId(newDistrict.id);
      onDistrictSelect(newDistrict);
      setSearch('');
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
          setSelectedName(district.name)
          onDistrictSelect(district);
        }}
        onDeleteDistrict={handleDeleteDistrict}
        onRenameDistrict={handleRenameDistrict}
      />
    </div>
  );
}
