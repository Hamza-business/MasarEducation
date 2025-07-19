import { toast } from "sonner";
import { FaTimesCircle } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";

export function toastRegionCreationSuccess(regionName: string) {
  toast.success("✅ Region created!", {
    description: `${regionName} was added as a new region`,
    duration: 4000,
  });
}
export function toastRegionCreationFailed(regionName: string) {
  toast.success("Failed to create region!", {
    description: `Failed to create region <${regionName}>. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}
export function toastRegionDeletionSuccess(regionName: string) {
  toast.success("✅ Region Deleted!", {
    description: `${regionName} region was deleted successfully`,
    duration: 4000,
  });
}
export function toastRegionDeletionFailed(regionName: string) {
  toast.success("Failed to delete region!", {
    description: `Failed to delete ${regionName} region. Please try again.`,
    duration: 4000,
  });
}
export function toastRegionUpdateSuccess(regionName: string) {
  toast.success("✅ Region Updated!", {
    description: `${regionName} region was updated successfully`,
    duration: 4000,
  });
}
export function toastRegionUpdateFailed(regionName: string) {
  toast.success("Failed to update region!", {
    description: `Failed to update ${regionName} region. Please try again.`,
    duration: 4000,
  });
}
export function toastRegionFetchFailed() {
  toast.success(`Failed to fetch regions`, {
    description: `Failed to fetch regions. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}


export function toastDistrictCreated(districtName: string, regionName: string) {
  toast.success(
    `${districtName} was created as a new district inside ${regionName} region`
  );
}
export function toastDistrictCreationSuccess(districtName: string, regionName: string) {
  toast.success("✅ District created!", {
    description: `${districtName} was created as a new district inside ${regionName} region`,
    duration: 4000,
  });
}
export function toastDistrictCreationFailed(districtName: string) {
  toast.success("Failed to create district!", {
    description: `Failed to create district <${districtName}>. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}
export function toastDistrictDeletionSuccess(districtName: string) {
  toast.success("✅ District Deleted!", {
    description: `${districtName} district was deleted successfully`,
    duration: 4000,
  });
}
export function toastDistrictDeletionFailed(districtName: string) {
  toast.success("Failed to delete district!", {
    description: `Failed to delete ${districtName} district. Please try again.`,
    duration: 4000,
  });
}
export function toastDistrictUpdateSuccess(districtName: string) {
  toast.success("✅ District Updated!", {
    description: `${districtName} district was updated successfully`,
    duration: 4000,
  });
}
export function toastDistrictUpdateFailed(districtName: string) {
  toast.success("Failed to update district!", {
    description: `Failed to update ${districtName} district. Please try again.`,
    duration: 4000,
  });
}
export function toastDistrictFetchFailed() {
  toast.success(`Failed to fetch districts`, {
    description: `Failed to fetch districts. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}


export function toastNeighborhoodCreationSuccess(neighborhoodName: string, districtName: string) {
  toast.success("✅ Neighbourhoods created!", {
    description: `${neighborhoodName} was created as a new neighbourhood inside district: ${districtName}`,
    duration: 4000,
  });
}
export function toastNeighborhoodCreationFailed(neighborhoodName: string) {
  toast.success("Failed to create neighbourhood!", {
    description: `Failed to create neighbourhood <${neighborhoodName}>. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}
export function toastNeighborhoodDeletionSuccess(neighborhoodName: string) {
  toast.success("✅ Neighborhood Deleted!", {
    description: `${neighborhoodName} neighborhood was deleted successfully`,
    duration: 4000,
  });
}
export function toastNeighborhoodDeletionFailed(neighborhoodName: string) {
  toast.success("Failed to delete neighborhood!", {
    description: `Failed to delete ${neighborhoodName} neighborhood. Please try again.`,
    duration: 4000,
  });
}
export function toastNeighborhoodUpdateSuccess(neighborhoodName: string) {
  toast.success("✅ Neighborhood Updated!", {
    description: `${neighborhoodName} neighborhood was updated successfully`,
    duration: 4000,
  });
}
export function toastNeighborhoodUpdateFailed(neighborhoodName: string) {
  toast.success("Failed to update neighborhood!", {
    description: `Failed to update ${neighborhoodName} neighborhood. Please try again.`,
    duration: 4000,
  });
}
export function toastNeighborhoodFetchFailed() {
  toast.success(`Failed to fetch neighbourhoods`, {
    description: `Failed to fetch neighbourhoods. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}


export function planStoreSuccess(name:string) {
  toast.success(`✅ Price Plan Stored!`, {
    description: `${name} Price plan was stored successfully`,
    duration: 4000,
  });
}
export function planStoreFailed(name:string) {
  toast.success(`Failed to store price plan`, {
    description: `Failed to store ${name} price plan. Please try again.`,
    duration: 4000,
  });
}
export function planActivationToggleSuccess(status:boolean) {
  toast.success(`✅ Price Plan ${status?"reActivated" : "DeActivated"}!`, {
    description: `Price plan was ${status?"reActivated" : "DeActivated"} successfully`,
    duration: 4000,
  });
}
export function planActivationToggleFailed(status:boolean) {
  toast.success(`Failed to ${status?"reActivate" : "DeActivate"} Price Plan!`, {
    description: `Failed to ${status?"reActivated" : "DeActivated"} price plan. Please try again.`,
    duration: 4000,
  });
}
export function planDeletionSuccess() {
  toast.success("✅ Price Plan Deleted!", {
    description: `Price plan was deleted successfully`,
    duration: 4000,
  });
}
export function planDeletionFailed() {
  toast.success("Failed to delete Price Plan!", {
    description: `Failed to delete price plan. Please try again.`,
    duration: 4000,
  });
}
export function planFetchFailed() {
  toast.success(`Failed to fetch price plans`, {
    description: `Failed to fetch price plans. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}

export function toastValidationErorr(msg:string) {
  toast.success(`Unvalid Data`, {
    description: msg,
    duration: 8000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}
export function toastMissingErorr(msg:string) {
  toast.success(`Some Required Feilds are missing`, {
    description: msg,
    duration: 8000,
    icon: <IoWarningOutline className="text-yellow-400 h-9 w-9"/>
  });
}
export function somethingWentWrong(msg:string) {
  toast.success(`something Went Wrong`, {
    description: msg,
    duration: 8000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}
export function uniquenessError(msg:string) {
  toast.success(`Uniqueness Error`, {
    description: msg,
    duration: 8000,
    icon: <FaTimesCircle className="text-red-500 h-7 w-7"/>
  });
}


export function agentActivationToggleSuccess(status:boolean) {
  toast.success(`✅ Agent was ${status?"reActivated" : "DeActivated"}!`, {
    description: `Agent was ${status?"reActivated" : "DeActivated"} successfully`,
    duration: 4000,
  });
}
export function agentActivationToggleFailed(status:boolean) {
  toast.success(`Failed to ${status?"reActivate" : "DeActivate"} Agent!`, {
    description: `Failed to ${status?"reActivated" : "DeActivated"} Agent. Please try again.`,
    duration: 4000,
  });
}
