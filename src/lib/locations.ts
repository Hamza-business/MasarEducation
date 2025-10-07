// DEPRECATED: These functions have been replaced by SWR hooks
// Use the hooks from @/hooks/useTurkeyLocations instead:
// - useProvinces()
// - useDistricts(province)
// - useNeighborhoods(district)

// Legacy functions kept for backward compatibility but should not be used in new code
export async function getRegions(setRegions:(regions: string[])=> void){
    console.warn('getRegions is deprecated. Use useProvinces() hook instead.');
    fetch("/api/turkey-api/provinces")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setRegions(data);
    })
    .catch(err => {
        console.error("Failed to fetch provinces:", err);
    });
}
export async function getDistricts(region:string, setDistricts:(districts: string[])=> void){
    console.warn('getDistricts is deprecated. Use useDistricts(province) hook instead.');
    fetch(`/api/turkey-api/districts?province=${encodeURIComponent(region)}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setDistricts(data);
    })
    .catch(err => {
        console.error("Failed to fetch districts:", err);
    });
}
export async function getNeighbourhoods(district:string, setNeighbourhoods:(neighbourhoods: string[])=> void){
    console.warn('getNeighbourhoods is deprecated. Use useNeighborhoods(district) hook instead.');
    fetch(`/api/turkey-api/neighborhoods?district=${encodeURIComponent(district)}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setNeighbourhoods(data);
    })
    .catch(err => {
        console.error("Failed to fetch neighbourhoods:", err);
    });
}