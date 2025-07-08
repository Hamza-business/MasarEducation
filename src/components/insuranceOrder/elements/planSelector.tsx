import { PlanWithPrice } from "@/types/all";
import { InsuranceApplication } from "@/types/all";
import { cn } from "@/lib/utils";

type Props = {
  plans: PlanWithPrice[];
  application: InsuranceApplication;
  setApplication: (value: InsuranceApplication) => void;
};

export default function PlanSelector({ plans, application, setApplication }: Props) {
  const handleSelect = (plan: PlanWithPrice) => {
    setApplication({
      ...application,
      plan: plan.name,
      price: plan.price ?? 0,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Our Packages</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = application.plan === plan.name;
          return (
            <div
              key={plan.id}
              className={cn(
                "cursor-pointer rounded-lg border p-4 text-center transition hover:shadow-sm",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow"
                  : "border-gray-200 bg-white"
              )}
              onClick={() => handleSelect(plan)}
            >
              <div className="text-2xl font-bold">{plan.price ?? "--"} TL</div>
              <div className="text-gray-600 mt-1">{plan.period} {plan.timeUnit}</div>
              <div className={`mt-2 h-1 ${isSelected ? "bg-blue-500" : "bg-gray-200"} rounded-full w-2/3 mx-auto`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
