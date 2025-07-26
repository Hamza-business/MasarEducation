export async function getRegions(setRegions:(regions: string[])=> void){
    fetch("https://turkiyeapi.dev/api/v1/provinces")
    .then((res) => res.json())
    .then((data) => {
    const namesOnly = data.data.map((province: { name: string }) => province.name);
        console.log(namesOnly);
        setRegions(namesOnly);
    })
    .catch(err => {
        console.error("Failed to fetch provinces:", err);
    });
}
export async function getDistricts(region:string, setDistricts:(districts: string[])=> void){
    fetch(`https://turkiyeapi.dev/api/v1/districts?province=${region}`)
    .then((res) => res.json())
    .then((data) => {
    const namesOnly = data.data.map((districts: { name: string }) => districts.name);
        console.log(namesOnly);
        setDistricts(namesOnly);
    })
    .catch(err => {
        console.error("Failed to fetch districts:", err);
    });
}
export async function getNeighbourhoods(district:string, setNeighbourhoods:(neighbourhoods: string[])=> void){
    fetch(`https://turkiyeapi.dev/api/v1/neighborhoods?district=${district}`)
    .then((res) => res.json())
    .then((data) => {
    const namesOnly = data.data.map((neighbourhoods: { name: string }) => neighbourhoods.name);
        console.log(namesOnly);
        setNeighbourhoods(namesOnly);
    })
    .catch(err => {
        console.error("Failed to fetch neighbourhoods:", err);
    });
}