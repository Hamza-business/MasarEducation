import { Button } from "@/components/ui/button";
import PriceRangeRow from "./PriceRangeRow";
import type { PriceRange } from "@/types/insurance";
import { IoIosArrowBack, IoMdDoneAll } from "react-icons/io";
import { CgAddR } from "react-icons/cg";

type Props = {
  prices: PriceRange[];
  setPrices: React.Dispatch<React.SetStateAction<PriceRange[]>>;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  mode: "create" | "edit";
};

export default function PriceRangesTab({
  prices,
  setPrices,
  onBack,
  onCancel,
  onSubmit,
  mode,
}: Props) {
  const handleChange = (index: number, field: keyof PriceRange, value: number) => {
    const updated = [...prices];
    updated[index] = { ...updated[index], [field]: value };
    setPrices(updated);
  };

  const handleAdd = () => {
    setPrices([...prices, { minAge: 0, maxAge: 0, price: 0 }]);
  };

  const handleDelete = (index: number) => {
    const updated = prices.filter((_, i) => i !== index);
    setPrices(updated);
  };

  return (
    <div className="space-y-4">
      {prices.map((range, index) => (
        <PriceRangeRow
          key={index}
          index={index}
          data={range}
          onChange={handleChange}
          onDelete={handleDelete}
        />
      ))}

      <Button variant="outline" onClick={handleAdd}>
        <CgAddR /> Add Price Range
      </Button>

      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <IoIosArrowBack />
            Back
          </Button>
          <Button onClick={onSubmit}>
            <IoMdDoneAll /> {mode === "create" ? "Submit" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
