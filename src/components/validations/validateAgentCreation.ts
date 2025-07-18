import { agentImageType, agentInfoType, agentUserType } from "@/types/all";
import isEmail from 'validator/lib/isEmail';
const isValidUrlSlug = /^[a-zA-Z0-9-_]+$/;

export function validateAgentCreation(
  agentInfo: agentInfoType,
  agentUser: agentUserType,
  agentImage: agentImageType | null
): string[] {
  const errors: string[] = [];

  if (agentInfo.agent_name === "") {
    errors.push("Agent name must be provided.");
  }
  if (agentInfo.percent < 0) {
    errors.push("Percent must be 0% or more.");
  }
  if (agentInfo.percent > 100) {
    errors.push("Percent must not be more than 100%");
  }
  if (!isValidUrlSlug.test(agentInfo.url || "") || agentInfo.url.length == 0) {
    errors.push("Invalid URL slug: contains special characters. you can contain only: a-z, A-Z, 0-9, -, _");
  }
  if (agentUser.name === "") {
    errors.push("User must have name.");
  }
  if (!isEmail(`${agentUser.email}@masare.edu`) || agentUser.email.length === 0) {
    errors.push("Invalid Email.");
  }
  if (agentUser.password === "") {
    errors.push("User must have password.");
  }
  if (agentUser.password.length < 10) {
    errors.push("User must have password of at least 10 digits.");
  }
  if (!agentImage || agentImage?.name === "" || agentImage?.mimetype === "" || agentImage?.data === "") {
    errors.push("Agent logo must be uploaded");
  }

  return errors;
}