import { Skeleton } from '@/components/ui/skeleton';
import type { Region, District } from '@/types/locations';
import DistrictItem from '@/components/locations/District_Manager/DistrictItem';

export default function DistrictList({
  districts,
  loading,
  selectedId,
  onSelect,
  search,
  selectedRegion
}: {
  districts: District[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (district: District) => void;
  search: string;
  selectedRegion: Region | null;
}) {

    if (!selectedRegion) {
        return (
            <p className="text-sm text-muted-foreground">
            No region selected. Please select a region first.
            </p>
        );
    }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-11 rounded-sm" />
        ))}
      </div>
    );
  }

  if (districts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {search
          ? `No district found matching "${search}"`
          : 'No districts are added for this region'}
      </p>
    );
  }

  return (
    <div className="max-h-[310px] overflow-y-auto pr-1 space-y-2">
      {districts.map((district) => (
        <DistrictItem
          key={district.id}
          district={district}
          selected={district.id === selectedId}
          onClick={() => onSelect(district)}
        />
      ))}
    </div>
  );
}
