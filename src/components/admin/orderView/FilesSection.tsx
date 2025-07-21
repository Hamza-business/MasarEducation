import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PassportFile, ReceiptFile } from '@/types/all';
import { FilePreview } from './FilePreview';

export function FileSection({ 
  passport,
  receipt,
  numOfCols
}:{ 
  passport: PassportFile | null,
  receipt: ReceiptFile | null,
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

              {/* Receipt File */}
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
          </div>
      </>
  );
}
