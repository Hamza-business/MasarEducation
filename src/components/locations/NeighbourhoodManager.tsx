'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NeighbourhoodList from '@/components/locations/Neighbourhood_Manager/NeighbourhoodList';
import type { District, Neighbourhood, Region } from '@/types/all';
import { 
  toastNeighborhoodCreationSuccess, 
  toastNeighborhoodCreationFailed, 
  toastNeighborhoodFetchFailed, 
  toastNeighborhoodDeletionSuccess, 
  toastNeighborhoodDeletionFailed,
  toastNeighborhoodUpdateSuccess,
  toastNeighborhoodUpdateFailed
} from '@/components/notifications/toast';

export default function NeighbourhoodManager({
  selectedDistrict,
  selectedRegion,
  clear
}: {
  selectedDistrict: District | null;
  selectedRegion: Region | null;
  clear: () => void;
}) {
  const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!selectedDistrict) {
      setSelectedId(null);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    setSelectedId(null);
    setNeighbourhoods([]);
    if (selectedDistrict) {
      fetchNeighbourhoods();
    } else {
      setNeighbourhoods([]);
    }
  }, [selectedDistrict]);


  
    async function handleRenameNeighbourhood(id: number, newName: string) {
      try {
        const res = await fetch(`/api/locations/neighbourhoods/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName }),
        });
  
        if (!res.ok) throw new Error("Rename failed");
  
        toastNeighborhoodUpdateSuccess(selectedName);
  
        setSelectedName(newName);
  
        setNeighbourhoods((prev) =>
          prev.map((r) => (r.id === id ? { ...r, name: newName } : r))
        );
      } catch {
        toastNeighborhoodUpdateFailed(selectedName);
      }
    }


  const handleDeleteNeighbourhood = async (id: number) => {
    try {
      const res = await fetch(`/api/locations/neighbourhoods/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toastNeighborhoodDeletionSuccess(selectedName);

      setNeighbourhoods((prev) => prev.filter((r) => r.id !== id));
      clear();
      setSelectedId(null);
      setSelectedName('');
    } catch (err) {
      err;
      toastNeighborhoodDeletionFailed(selectedName);
    }
  };

  async function fetchNeighbourhoods() {
    try {
      if (!selectedDistrict) return;

      setLoading(true);

      const res = await fetch(`/api/locations/neighbourhoods?district=${selectedDistrict.id}`);

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to fetch neighborhoods: ${errorBody}`);
      }

      const data = await res.json();
      setNeighbourhoods(data);
    } catch (err: any) {
      toastNeighborhoodFetchFailed();
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!selectedDistrict || !selectedRegion) return;

    try {
      setCreating(true);

      const res = await fetch('/api/locations/neighbourhoods', {
        method: 'POST',
        body: JSON.stringify({
          name: search,
          districts: selectedDistrict.id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to create neighborhood: ${errorBody}`);
      }

      const newNeighbourhood = await res.json();
      toastNeighborhoodCreationSuccess( newNeighbourhood.name, selectedDistrict.name);

      setNeighbourhoods((prev) => [...prev, newNeighbourhood]);
      setSelectedName(search);
      setSelectedId(newNeighbourhood.id);
      setSearch('');
    } catch (err: any) {
      toastNeighborhoodCreationFailed(search);
    } finally {
      setCreating(false);
    }
  }

  const filtered = neighbourhoods.filter((n) =>
    n.name.toLowerCase().includes(search.toLowerCase())
  );
  const notFound = search && filtered.length === 0;

  return (
    <div className="p-4 border rounded-md shadow bg-white dark:bg-zinc-900 w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Neighbourhoods</h2>
        <span className="text-sm text-muted-foreground">{neighbourhoods.length}</span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search or add neighbourhood"
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

      <NeighbourhoodList
        loading={loading}
        neighbourhoods={filtered}
        selectedId={selectedId}
        search={search}
        selectedDistrict={selectedDistrict}
        onSelect={(neighbourhood) => {
          setSelectedId(neighbourhood.id);
          setSelectedName(neighbourhood.name)
        }}
        onDeleteNeighbourhood={handleDeleteNeighbourhood}
        onRenameNeighbourhood={handleRenameNeighbourhood}
      />
    </div>
  );
}
