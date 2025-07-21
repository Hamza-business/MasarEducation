import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsuranceFile, PassportFile, ReceiptFile } from '@/types/all';
import { FilePreview } from './FilePreview';

export function FileSection({ 
  passport,
  receipt,
  insuranceFiles,
  numOfCols
}:{ 
  passport: PassportFile | null,
  receipt: ReceiptFile | null,
  insuranceFiles: InsuranceFile[],
  numOfCols: number
}) {
  

  return (
      <>
          <div className={`grid md:grid-cols-${numOfCols} gap-6 transition-all`}>
              {/* Passport File */}
              {passport && (
                  <Card className='rounded-sm gap-2 py-6'>
                      <CardHeader className='px-5'>
                          <CardTitle>Passport</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 px-5">
                          <FilePreview file={passport} />
                      </CardContent>
                  </Card>
              )}

              {receipt && (
                  <Card className='rounded-sm gap-2 py-6'>
                      <CardHeader className='px-5'>
                          <CardTitle>Receipt</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 px-5">
                          <FilePreview file={receipt} />
                      </CardContent>
                  </Card>
              )}

              {insuranceFiles && insuranceFiles.length > 0 && (
                insuranceFiles.map((e, i) => (
                  <Card className="rounded-sm gap-2 py-6" key={i}>
                    <CardHeader className="px-5">
                      <CardTitle>Insurance File</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-5">
                      <FilePreview file={e} />
                    </CardContent>
                  </Card>
                ))
              )}
          </div>
      </>
  );
}
