export type InsurancePackage = {
  id?: number;            // optional for newly created packages
  name: string;
  timeUnit: "day" | "week" | "month" | "year";
  period: number;
  prices: PriceRange[];
};

export type PriceRange = {
  minAge: number;
  maxAge: number;
  price: number;
};