import { Button } from "@/components/ui/button";
import type { PriceRange } from "@/types/all";
import { IoIosArrowBack } from "react-icons/io";
import { CgAddR } from "react-icons/cg";
import { Label } from "@/components/ui/label";
import { MdNavigateNext } from "react-icons/md";

type Props = {
  onBack: () => void;
  onCancel: () => void;
  onNext: () => void;
};

export default function UserInfoTab({
  onBack,
  onCancel,
  onNext,
}: Props) {
  const handleChange = (index: number, field: keyof PriceRange, value: number) => {
    // const updated = [...prices];
    // updated[index] = { ...updated[index], [field]: value };
    // setPrices(updated);
  };

  const handleAdd = () => {
    // setPrices([...prices, { minAge: 0, maxAge: 0, price: 0 }]);
  };

  const handleDelete = (index: number) => {
    // const updated = prices.filter((_, i) => i !== index);
    // setPrices(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Label className="flex-1">Minimum Age</Label>
        <Label className="flex-1">Maximum Age</Label>
        <Label className="flex-1">Price</Label>
      </div>

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
          <Button onClick={onNext}>Next <MdNavigateNext /></Button>
        </div>
      </div>
    </div>
  );
}
