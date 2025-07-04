import RegionItem from '@/components/locations/Region_Manager/RegionItem';
import { Skeleton } from '@/components/ui/skeleton';
import type { Region } from '@/types/locations';

export default function RegionList({
  regions,
  loading,
  selectedId,
  onSelect,
  search
}: {
  regions: Region[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (region: Region) => void;
  search: string;
}) {
    if (loading) {
      return (
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-11 rounded-sm" />
          ))}
        </div>
      );
    }

    if (regions.length === 0) {
      return (
        <p className="text-sm text-muted-foreground text-center">
          {search
            ? `No region found matching "${search}"`
            : 'No regions have been added yet'}
        </p>
      );
    }

  return (
    <div className="h-[360px] overflow-y-auto pr-1 space-y-2">
      {regions.map((region) => (
        <RegionItem
          key={region.id}
          region={region}
          selected={region.id === selectedId}
          onClick={() => onSelect(region)}
        />
      ))}
    </div>
  );
}
