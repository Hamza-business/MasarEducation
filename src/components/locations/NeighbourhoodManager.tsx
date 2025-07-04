'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NeighbourhoodList from '@/components/locations/Neighbourhood_Manager/NeighbourhoodList';
import { District } from '@/components/locations/DistrictManager';

export interface Neighbourhood {
  id: number;
  name: string;
  hidden: boolean;
  districts: number;
}

export default function NeighbourhoodManager({
  selectedDistrict,
}: {
  selectedDistrict: District | null;
}) {
  const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
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

  async function fetchNeighbourhoods() {
    setLoading(true);
    const res = await fetch(`/api/neighbourhoods?district=${selectedDistrict?.id}`);
    const data = await res.json();
    setNeighbourhoods(data);
    setLoading(false);
  }

  async function handleAdd() {
    if (!selectedDistrict) return;
    setCreating(true);
    const res = await fetch('/api/neighbourhoods', {
      method: 'POST',
      body: JSON.stringify({
        name: search,
        districts: selectedDistrict.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newNeighbourhood = await res.json();
    setNeighbourhoods((prev) => [...prev, newNeighbourhood]);
    setSearch('');
    setCreating(false);
    setSelectedId(newNeighbourhood.id);
  }

  const filtered = neighbourhoods.filter((n) =>
    n.name.toLowerCase().includes(search.toLowerCase())
  );
  const notFound = search && filtered.length === 0;

  return (
    <div className="p-4 border rounded-md shadow bg-white dark:bg-zinc-900 w-full max-w-sm space-y-4">
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
        onSelect={(neighbourhood) => setSelectedId(neighbourhood.id)}
      />
    </div>
  );
}
