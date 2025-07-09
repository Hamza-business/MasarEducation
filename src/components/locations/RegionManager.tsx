'use client';

import { useEffect, useState } from 'react';
import RegionList from '@/components/locations/Region_Manager/RegionList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Region } from '@/types/all';
import { 
  toastRegionCreationSuccess, 
  toastRegionCreationFailed, 
  toastRegionFetchFailed, 
  toastRegionDeletionSuccess, 
  toastRegionDeletionFailed,
  toastRegionUpdateSuccess,
  toastRegionUpdateFailed
} from '@/components/notifications/toast';

export default function RegionManager({
  onRegionSelect,
  clear
}: {
  onRegionSelect: (region: Region) => void;
  clear: () => void;
}) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);


  async function handleRenameRegion(id: number, newName: string) {
    try {
      const res = await fetch(`/api/regions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error("Rename failed");

      toastRegionUpdateSuccess(selectedName);

      setSelectedName(newName);

      setRegions((prev) =>
        prev.map((r) => (r.id === id ? { ...r, name: newName } : r))
      );
    } catch {
      toastRegionUpdateFailed(selectedName);
    }
  }



  const handleDeleteRegion = async (id: number) => {
    try {
      const res = await fetch(`/api/regions/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toastRegionDeletionSuccess(selectedName);

      setRegions((prev) => prev.filter((r) => r.id !== id));
      clear();
      setSelectedId(null);
      setSelectedName('');
    } catch (er) {
      er;
      toastRegionDeletionFailed(selectedName);
    }
  };

  async function fetchRegions() {
    try {
      setLoading(true);

      const res = await fetch('/api/regions');

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to fetch regions: ${errorBody}`);
      }

      const data = await res.json();
      setRegions(data);
    } catch (err: any) {
      toastRegionFetchFailed();
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    try {
      setCreating(true);

      const res = await fetch('/api/regions', {
        method: 'POST',
        body: JSON.stringify({ country: 1, name: search }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to create region: ${errorBody}`);
      }

      const newRegion = await res.json();
      toastRegionCreationSuccess(selectedName);

      setRegions((prev) => [...prev, newRegion]);
      setSelectedName(search);
      setSelectedId(newRegion.id);
      onRegionSelect(newRegion);
      setSearch('');
    } catch (err: any) {
      toastRegionCreationFailed(search);
    } finally {
      setCreating(false);
    }
  }

  const filtered = regions.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  const notFound = search && filtered.length === 0;

  return (
    <div className="p-4 border rounded-md shadow bg-white dark:bg-zinc-900 w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Regions</h2>
        <span className="text-sm text-muted-foreground">{regions.length}</span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search or add region"
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

      <RegionList
        loading={loading}
        regions={filtered}
        selectedId={selectedId}
        search={search}
        onSelect={(region) => {
          setSelectedId(region.id);
          setSelectedName(region.name)
          onRegionSelect(region);
        }}
        onDeleteRegion={handleDeleteRegion}
        onRenameRegion={handleRenameRegion}
      />
    </div>
  );
}
