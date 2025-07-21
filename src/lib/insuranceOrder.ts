import { InsuranceOrderWithPersonInfo, PassportFile, ReceiptFile } from "@/types/all";

export async function fetchInsuranceOrdertByTrackCode(trackCode:string): Promise<InsuranceOrderWithPersonInfo> {
    const res = await fetch(`/api/order/${trackCode}/info`);
    const data = await res.json();
    return data;
}
export async function fetchInsuranceOrderFiles(orderid:number): Promise<{passport: PassportFile, receipt: ReceiptFile}> {
    const res = await fetch(`/api/order/${orderid.toString()}/files`);
    const data = await res.json();
    return data;
}