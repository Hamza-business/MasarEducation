import { PersonInfo, PassportFile, InsuranceApplication, ReceiptFile } from "@/types/all";
import isEmail from 'validator/lib/isEmail';

export function validatePersonalInfo(
  personInfo: PersonInfo
): string[] {
  const errors: string[] = [];

  if (!personInfo.nat) {
    errors.push("Nationality is required.");
  }

  if (personInfo.name == "") {
    errors.push("Name is required.");
  }

  if (!isEmail(personInfo.email)) {
    errors.push("A valid Email is required.");
  }

  if (personInfo.phone == "") {
    errors.push("Phone is required.");
  }

  if (!personInfo.dob) {
    errors.push("Date of birth is required.");
  }

  return errors;
}

export function validatePassport(
  passportFile: PassportFile | null
): string[] {
  const errors: string[] = [];

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

export function validatePackage(
  application: InsuranceApplication,
): string[] {
  const errors: string[] = [];

  if (application.plan.length == 0) {
    errors.push("You must choose one of our packages");
  }

  if (application.price == null) {
    errors.push("Problem with price");
  }

  return errors;
}


export function validateReceipt(
  receiptFile: ReceiptFile | null
): string[] {
  const errors: string[] = [];

  if (!receiptFile) {
    errors.push("Payment Receipt file must be uploaded.");
  }

  return errors;
}