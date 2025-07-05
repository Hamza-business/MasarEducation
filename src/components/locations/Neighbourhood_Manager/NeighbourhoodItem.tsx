import { Neighbourhood } from '@/types/locations';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DropdownDeleteItem from '@/components/ui/dropdown-delete-item';
import DropdownEditItem from '@/components/ui/dropdown-edit-item';

export default function NeighbourhoodItem({
  neighbourhood,
  selected,
  onClick,
  onDelete,
  onRename
}: {
  neighbourhood: Neighbourhood;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
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
          <DropdownEditItem
            currentName={neighbourhood.name}
            itemName="neighbourhood"
            onEdit={onRename}
          />
          <DropdownDeleteItem onConfirm={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
