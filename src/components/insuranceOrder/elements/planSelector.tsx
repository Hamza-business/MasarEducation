import { PersonInfo, PlanWithPrice } from "@/types/all";
import { InsuranceApplication } from "@/types/all";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { planFetchFailed } from "@/components/notifications/toast";


function calculateAge(dob: Date): number {
  const now = new Date();
  const birthDate = new Date(dob);
  let age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}


type Props = {
  personInfo: PersonInfo;
  availablePlans: PlanWithPrice[];
  application: InsuranceApplication;
  setApplication: (value: InsuranceApplication) => void;
  setAvailablePlans: (plans: PlanWithPrice[]) => void;
};

export default function PlanSelector({ personInfo, availablePlans, application, setApplication, setAvailablePlans }: Props) {
  const handleSelect = (plan: PlanWithPrice) => {
    setApplication({
      ...application,
      plan: plan.name,
      price: plan.price ?? 0,
    });
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlans = async () => {
        setApplication({...application, plan: "", price: null})
        setLoading(true);
        if (!personInfo.dob) return;
        try {
            const age = calculateAge(personInfo.dob); // Implement this function
            const res = await fetch(`/api/insurances/plans-with-prices?age=${age}`);

            if (!res.ok) {
              planFetchFailed();
              return;
            }
            const data: PlanWithPrice[] = await res.json();
            setAvailablePlans(data);
            setLoading(false);
        } catch (err) {
            planFetchFailed();
            setLoading(true);
        }
    };

    if(availablePlans.length==0){
      fetchPlans();
    } else{
      setLoading(false);
    }
  }, [personInfo.dob]); // Refetch plans when DOB changes


  const SkeletonCard = () => (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-700 p-4 space-y-2 text-center">
      <div className="h-6 bg-gray-300 dark:bg-zinc-700 rounded w-1/2 mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/3 mx-auto"></div>
      <div className="h-1 bg-gray-200 dark:bg-zinc-800 rounded w-2/3 mx-auto mt-2" />
    </div>
  );

  return (
    <div className="space-y-4">
        <h2 className="text-lg font-semibold">Our Packages</h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : availablePlans.length === 0 ? (
          <div className="bg-yellow-50 dark:bg-neutral-800 dark:text-gray-200 p-4 rounded-md text-sm text-gray-800 border border-yellow-300 dark:border-yellow-600">
            😔 We are sorry, but there are no available packages for your age group right now.
            <br />
            Please contact our <a href="/support" className="underline font-medium">Support Team</a> for help.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availablePlans.map((plan) => {
              const isSelected = application.plan === plan.name;
              return (
                <div
                  key={plan.id}
                  className={cn(
                    "cursor-pointer rounded-lg border p-4 text-center transition hover:shadow-sm",
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow dark:bg-gray-900 dark:border-blue-400"
                      : "border-gray-200 bg-white dark:bg-zinc-900 dark:border-zinc-700"
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
        )}
    </div>

  );
}
