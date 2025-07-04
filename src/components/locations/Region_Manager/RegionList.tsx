import RegionItem from '@/components/locations/Region_Manager/RegionItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Region } from '@/components/locations/RegionManager';

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
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-md" />
          ))}
        </div>
      );
    }

    if (regions.length === 0) {
      return (
        <p className="text-sm text-muted-foreground">
          {search
            ? `No region found matching "${search}"`
            : 'No regions have been added yet'}
        </p>
      );
    }

  return (
    <div className="max-h-[280px] overflow-y-auto pr-1 space-y-2">
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
