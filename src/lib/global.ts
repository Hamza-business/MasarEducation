import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export function convertDate(dt:Timestamp|Date|string):string{
    const issuedDate = new Date(dt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return issuedDate;
}