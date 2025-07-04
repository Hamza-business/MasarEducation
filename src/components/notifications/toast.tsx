import { toast } from "sonner";
import { FaTimesCircle } from "react-icons/fa";

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
    icon: <FaTimesCircle />
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
export function toastRegionFetchFailed() {
  toast.success(`Failed to fetch regions`, {
    description: `Failed to fetch regions. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle />
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
    icon: <FaTimesCircle />
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
export function toastDistrictFetchFailed() {
  toast.success(`Failed to fetch districts`, {
    description: `Failed to fetch districts. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle />
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
    icon: <FaTimesCircle />
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
export function toastNeighborhoodFetchFailed() {
  toast.success(`Failed to fetch neighbourhoods`, {
    description: `Failed to fetch neighbourhoods. Please try again.`,
    duration: 4000,
    icon: <FaTimesCircle />
  });
}
