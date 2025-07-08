import { Skeleton } from '@/components/ui/skeleton';
import type { Region, District } from '@/types/all';
import DistrictItem from '@/components/locations/District_Manager/DistrictItem';

export default function DistrictList({
  districts,
  loading,
  selectedId,
  onSelect,
  search,
  selectedRegion,
  onDeleteDistrict,
  onRenameDistrict
}: {
  districts: District[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (district: District) => void;
  search: string;
  selectedRegion: Region | null;
  onDeleteDistrict: (id: number) => void;
  onRenameDistrict: (id: number, newName: string) => void;
}) {

    if (!selectedRegion) {
        return (
            <p className="text-sm text-muted-foreground text-center">
            No region selected. Please select a region first.
            </p>
        );
    }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-11 rounded-sm" />
        ))}
      </div>
    );
  }

  if (districts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        {search
          ? `No district found matching "${search}"`
          : 'No districts are added for this region'}
      </p>
    );
  }

  return (
    <div className="h-[360px] overflow-y-auto pr-1 space-y-2">
      {districts.map((district) => (
        <DistrictItem
          key={district.id}
          district={district}
          selected={district.id === selectedId}
          onClick={() => onSelect(district)}
          onDelete={() => onDeleteDistrict(district.id)}
          onRename={(newName) => onRenameDistrict(district.id, newName)}
        />
      ))}
    </div>
  );
}
