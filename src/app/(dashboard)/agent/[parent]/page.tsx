'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Orders() {
    const pathname = usePathname().split("/");
    let pathurl = "";
    if(pathname[1] == "admin"){
        pathurl = pathname[1]
    } else if (pathname[1] == "agent"){
        pathurl = `${pathname[1]}/${pathname[2]}`;
    }
    const router = useRouter();

    useEffect(() => {
        router.push(`/${pathurl}/orders/insurance`); // replace with the actual path
    }, [router]);
    return null;
}