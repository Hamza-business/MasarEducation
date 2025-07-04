import { Skeleton } from '@/components/ui/skeleton';
import { District } from '@/components/locations/DistrictManager';
import DistrictItem from '@/components/locations/District_Manager/DistrictItem';

export default function DistrictList({
  districts,
  loading,
  selectedId,
  onSelect,
  search
}: {
  districts: District[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (district: District) => void;
  search: string;
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-xl" />
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
