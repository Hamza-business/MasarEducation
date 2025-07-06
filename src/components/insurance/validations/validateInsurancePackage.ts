import { InsurancePackage, PriceRange } from '@/types/insurance';
import { validatePriceRanges } from './validatePriceRanges';

export function validateInsurancePackage(pkg: {
  name: string;
  unit: string;
  period: number;
  prices: PriceRange[];
}): string[] {
  const errors: string[] = [];

  if (!pkg.name.trim()) {
    errors.push("Package name is required.");
  }

  if (!pkg.unit || !["day", "week", "month", "year"].includes(pkg.unit)) {
    errors.push("Valid unit is required.");
  }

  if (!Number.isInteger(pkg.period) || pkg.period <= 0) {
    errors.push("Period must be a positive integer.");
  }

  errors.push(...validatePriceRanges(pkg.prices));

  return errors;
}
