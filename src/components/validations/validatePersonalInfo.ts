import { PersonInfo, PassportFile } from "@/types/all";

export function validatePersonalInfo(
  personInfo: PersonInfo,
  passportFile: PassportFile | null
): string[] {
  const errors: string[] = [];

  if (!personInfo.nat) {
    errors.push("Nationality is required.");
  }

  if (!personInfo.dob) {
    errors.push("Date of birth is required.");
  }

  if (!passportFile) {
    errors.push("Passport file must be uploaded.");
  }

  return errors;
}
