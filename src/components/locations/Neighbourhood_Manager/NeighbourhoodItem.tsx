import { Neighbourhood } from '@/components/locations/NeighbourhoodManager';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function NeighbourhoodItem({
  neighbourhood,
  selected,
  onClick,
}: {
  neighbourhood: Neighbourhood;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-4 rounded-sm border cursor-pointer transition-all h-11 ${
        selected ? 'bg-muted' : 'hover:bg-accent'
      }`}
    >
      <span className="truncate text-sm font-normal">{neighbourhood.name}</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit name</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
