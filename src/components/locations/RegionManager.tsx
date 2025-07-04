'use client';

import { useEffect, useState } from 'react';
import RegionList from '@/components/locations/Region_Manager/RegionList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface Region {
  id: number;
  name: string;
  hidden: boolean;
}

export default function RegionManager({
  onRegionSelect,
}: {
  onRegionSelect: (region: Region) => void;
}) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  async function fetchRegions() {
    setLoading(true);
    const res = await fetch('/api/regions');
    const data = await res.json();
    setRegions(data);
    setLoading(false);
  }

  async function handleAdd() {
    setCreating(true);
    const res = await fetch('/api/regions', {
      method: 'POST',
      body: JSON.stringify({ country:1, name: search }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newRegion = await res.json();
    setRegions((prev) => [...prev, newRegion]);
    setSearch('');
    setCreating(false);
    setSelectedId(newRegion.id);
    onRegionSelect(newRegion);
  }

  const filtered = regions.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  const notFound = search && filtered.length === 0;

  return (
    <div className="p-4 border rounded-md shadow bg-white dark:bg-zinc-900 w-full max-w-sm space-y-4">
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
          onRegionSelect(region);
        }}
      />
    </div>
  );
}
