import { InsurancePackage, PriceRange } from '@/types/all';
import { validatePriceRanges } from './validatePriceRanges';

export function validateInsurancePackage(pkg: {
  name: string;
  period: number;
  timeUnit: string;
  prices: PriceRange[];
}): string[] {
  const errors: string[] = [];

  if (!pkg.name.trim()) {
    errors.push("Package name is required.");
  }

  if (!pkg.timeUnit || !["day", "week", "month", "year"].includes(pkg.timeUnit)) {
    errors.push("Valid time unit is required.");
  }

  if (!Number.isInteger(pkg.period) || pkg.period <= 0) {
    errors.push("Unit must be a positive integer.");
  }

  errors.push(...validatePriceRanges(pkg.prices));

  return errors;
}
