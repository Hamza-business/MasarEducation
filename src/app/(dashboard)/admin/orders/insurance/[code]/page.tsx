'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {InsuranceOrderWithPersonInfo, OrderDetails, PassportFile, ReceiptFile} from '@/types/all';
import { InsuranceOrderTable } from '@/components/admin/InsuranceOrdersTable';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';
import { useParams } from 'next/navigation';
import { fetchInsuranceOrderFiles, fetchInsuranceOrdertByTrackCode } from '@/lib/insuranceOrder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePreview } from '@/components/admin/orderView/FilePreview';
import { CgAddR } from 'react-icons/cg';
import { Button } from '@/components/ui/button';
import { LuPackageSearch } from 'react-icons/lu';
import { FileSection } from '@/components/admin/orderView/FilesSection';
import { CiGrid2H, CiGrid2V, CiGrid41 } from 'react-icons/ci';
import { BsGrid3X2 } from 'react-icons/bs';

export default function InsuranceOrders() {
    const params = useParams();
    const trackCode = typeof params?.code === 'string' && params.code ? params.code : "0";
    const [orderDetails, setOrderDetails] = useState<InsuranceOrderWithPersonInfo>();
    const [orderid, setOrderid] = useState<number>();
    const [passport, setPassport] = useState<PassportFile | null>(null);
    const [receipt, setReceipt] = useState<ReceiptFile | null>(null);

    const [numOfCols, setNumOfCols] = useState(2);

    useEffect(() => {
        fetchInsuranceOrdertByTrackCode(trackCode).then(res => {
            setOrderDetails(res);
            setOrderid(res.order_id);
        });
    }, [trackCode != "0"]);

    useEffect(() => {
        if (orderid) {
            fetchInsuranceOrderFiles(orderid).then(data => {
                setPassport(data.passport)
                setReceipt(data.receipt)
            });
        }
    }, [orderid]);

    return (
        <div className="space-y-6 ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">Order Files</h1>
                <div className='flex gap-2'>
                    <Button ><LuPackageSearch />Manage Order Status</Button>
                    <Button variant="outline" onClick={() => setNumOfCols(prev => prev<4 ? prev+1 : prev=1)}>
                        {numOfCols == 1 ? <CiGrid2V /> : numOfCols == 2 ? <BsGrid3X2 /> : numOfCols == 3 ? <CiGrid41 /> : <CiGrid2H />}
                    </Button>
                </div>
            </div>

            <FileSection passport={passport} receipt={receipt} numOfCols={numOfCols}/>
        </div>
    );
}
