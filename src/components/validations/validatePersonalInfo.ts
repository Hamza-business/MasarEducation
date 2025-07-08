import { PersonInfo, PassportFile, InsuranceApplication } from "@/types/all";

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

export function validateInsuranceApplication(
  application: InsuranceApplication,
): string[] {
  const errors: string[] = [];

  if (!application.region) {
    errors.push("Region is required.");
  }

  if (!application.district) {
    errors.push("District is required.");
  }

  if (!application.neighbourhood) {
    errors.push("Neighbourhood is required.");
  }

  if (application.street.length == 0) {
    errors.push("Street is required.");
  }

  if (application.building.length == 0) {
    errors.push("Building No is required.");
  }

  if (application.appartment.length == 0) {
    errors.push("Appartment No is required.");
  }


  return errors;
}
