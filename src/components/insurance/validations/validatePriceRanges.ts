import { PriceRange } from '@/types/insurance';

export function validatePriceRanges(ranges: PriceRange[]): string[] {
  const errors: string[] = [];

  if (ranges.length === 0) {
    errors.push('At least one price range must be added.');
    return errors;
  }

  const sorted = [...ranges].sort((a, b) => a.minAge - b.minAge);

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];

    if (current.minAge < 0 || current.maxAge < 0) {
      errors.push(`Ages must be positive. (Range ${i + 1})`);
    }

    if (current.minAge >= current.maxAge) {
      errors.push(`Max age must be greater than min age. (Range ${i + 1})`);
    }

    if (i > 0) {
      const prev = sorted[i - 1];
      if (current.minAge <= prev.maxAge) {
        errors.push(
          `Age ranges overlap or are inclusive fully or partially in other price rangem Check ranges ${i} and ${i + 1}.`
        );
      }

      if (current.minAge > prev.maxAge + 1) {
        errors.push(
          `There is a missing age between range ${i} and ${i + 1}. (e.g. ${prev.maxAge + 1})`
        );
      }
    }
  }

  return errors;
}
