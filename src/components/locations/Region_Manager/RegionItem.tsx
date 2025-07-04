import type { Region } from '@/types/locations';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DropdownDeleteItem from "@/components/ui/dropdown-delete-item";
import DropdownEditItem from '@/components/ui/dropdown-edit-item';

export default function RegionItem({
  region,
  selected,
  onClick,
  onDelete
}: {
  region: Region;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-4 rounded-sm border cursor-pointer transition-all h-11 ${
        selected ? 'bg-muted' : 'hover:bg-accent'
      }`}
    >
      <span className="truncate text-sm font-normal">{region.name}</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownEditItem onClick={onDelete} />
          <DropdownDeleteItem onConfirm={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
