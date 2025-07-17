import { Button } from "@/components/ui/button";
import type { agentUserType, PriceRange } from "@/types/all";
import { IoIosArrowBack } from "react-icons/io";
import { CgAddR } from "react-icons/cg";
import { Label } from "@/components/ui/label";
import { MdNavigateNext } from "react-icons/md";
import { Input } from "@/components/ui/input";

type Props = {
  agentUser: agentUserType;
  setUserInfo: (agentUser: agentUserType)=>void;
  onBack: () => void;
  onCancel: () => void;
  onNext: () => void;
};

export default function UserInfoTab({
  agentUser,
  setUserInfo,
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
      <div className="space-y-4">
      <div className="mb-5">
        <Label className="mb-2">Name</Label>
        <Input
          value={agentUser.name}
          onChange={(e) => setUserInfo({ ...agentUser, name: e.target.value })}
          placeholder="Owner full name"
        />
      </div>

      <div className="mb-5">
        <Label className="mb-2">Email</Label>
        <div className="flex items-center">
          <Input
            className="flex-1 rounded-sm rounded-tr-none rounded-br-none"
            placeholder="e.g., john"
            value={agentUser.email}
            onChange={(e) =>
              setUserInfo({ ...agentUser, email: e.target.value.toLowerCase() })
            }
          />
          <span className="bg-muted px-3 py-2 text-sm rounded-sm rounded-tl-none rounded-bl-none">.agent@masare.edu</span>
        </div>
        <p className="text-xs mt-1 text-muted-foreground">Email Will be: 
          {agentUser.email && (
            <span className="text-blue-400"> {agentUser.email}.agent@masare.edu</span>
          )}
        </p>
      </div>

      <div className="mb-5">
        <Label className="mb-2">Password</Label>
        <Input
          type="password"
          value={agentUser.passowrd}
          onChange={(e) => setUserInfo({ ...agentUser, passowrd: e.target.value })}
          placeholder="Enter password"
        />
      </div>
    </div>

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
