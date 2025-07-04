import { Skeleton } from '@/components/ui/skeleton';
import NeighbourhoodItem from '@/components/locations/Neighbourhood_Manager/NeighbourhoodItem';
import type { District, Neighbourhood } from '@/types/locations';

export default function NeighbourhoodList({
  neighbourhoods,
  loading,
  selectedId,
  onSelect,
  search,
  selectedDistrict
}: {
  neighbourhoods: Neighbourhood[];
  loading: boolean;
  selectedId: number | null;
  onSelect: (neighbourhood: Neighbourhood) => void;
  search: string;
  selectedDistrict: District | null;
}) {
  if (!selectedDistrict) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        No district selected. Please select a district first.
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

  if (neighbourhoods.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        {search
          ? `No neighbourhood found matching "${search}"`
          : 'No neighbourhoods are added for this district'}
      </p>
    );
  }

  return (
    <div className="h-[360px] overflow-y-auto pr-1 space-y-2">
      {neighbourhoods.map((neighbourhood) => (
        <NeighbourhoodItem
          key={neighbourhood.id}
          neighbourhood={neighbourhood}
          selected={neighbourhood.id === selectedId}
          onClick={() => onSelect(neighbourhood)}
        />
      ))}
    </div>
  );
}
