// components/insurance/InsuranceList.tsx
import InsuranceItem from "./InsuranceItem";

type Props = {
  packages: any[];
  onEdit: (pkg: any) => void;
  onDelete: (pkgid: number) => void;
  onToggleActive: (pkgId: number, desiredState: boolean) => void;
  status: boolean
};

export default function InsuranceList({ packages, onEdit, onDelete, onToggleActive, status}: Props) {
  const arr = packages.filter(pkg => pkg.active == status);

  if (arr.length === 0) {
    return <p className="text-muted-foreground">
      {status ? "No Active insurance price plans are available." : "No Disabled insurance price plans are available."}
    </p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {arr.map((pkg) => (
        
        <InsuranceItem key={pkg.id} pkg={pkg} onEdit={() => onEdit(pkg)} onDelete={() => {
          onDelete(pkg.id);
        }} 
        onToggleActive={onToggleActive}/>
      ))}
    </div>
  );
}
