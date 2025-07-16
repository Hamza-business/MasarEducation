import { oredrStatus } from "@/types/all";

export const statusMap: Record<oredrStatus, { label: string; color: string, stl:string}> = {
  "pending": { label: "Pending", color: "bg-gray-300 text-gray-700", stl:"bg-gray-200 text-gray-800 border-gray-500"},
  "under review": { label: "Under Review", color: "bg-yellow-100 text-yellow-900", stl:"bg-yellow-100 text-yellow-800 border-yellow-500"},
  "completed": { label: "Completed", color: "bg-green-200 text-green-800", stl:"bg-green-100 text-green-800 border-green-800"},
  "rejected": { label: "Rejected", color: "bg-red-200 text-red-800", stl:"bg-red-100 text-red-800 border-red-500"},
};