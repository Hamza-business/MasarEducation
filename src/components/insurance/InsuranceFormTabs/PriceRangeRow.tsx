import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PriceRange } from "@/types/all";
import { Trash2 } from "lucide-react";

type Props = {
  index: number;
  data: PriceRange;
  onChange: (index: number, field: keyof PriceRange, value: number) => void;
  onDelete: (index: number) => void;
};

export default function PriceRangeRow({ index, data, onChange, onDelete }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Input
        type="number"
        placeholder="Min Age"
        value={data.minAge}
        onChange={(e) => onChange(index, "minAge", Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Max Age"
        value={data.maxAge}
        onChange={(e) => onChange(index, "maxAge", Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Price"
        value={data.price}
        onChange={(e) => onChange(index, "price", Number(e.target.value))}
      />
      <Button
        variant="outline"
        type="button"
        onClick={() => onDelete(index)}
        className="text-white bg-red-500 hover:bg-red-600 hover:text-white dark:text-red-500 dark:hover:text-white border border-red-500 py-2 rounded-md meow"
      ><Trash2/>
      </Button>
    </div>
  );
}
