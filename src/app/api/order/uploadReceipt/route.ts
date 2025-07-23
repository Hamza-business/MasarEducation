import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { InsuranceFile, MimeType, ReceiptFile  } from "@/types/all";

function isValidReceiptFile(file: any): file is InsuranceFile {
  return (
    typeof file === "object" &&
    typeof file.name === "string" &&
    typeof file.mimetype === "string" &&
    typeof file.data === "string"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // if (!isValidReceiptFile(body)) {
    //   return new NextResponse("Invalid receipt file format", { status: 400 });
    // }

    console.log(body);

    const result = await prisma.receipts.create({
      data: {
        name: body.name,
        mimetype: body.mimetype.toLowerCase() as MimeType,
        data: body.data,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("Error uploading receipt:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     // if (!isValidReceiptFile(body)) {
//     //   return new NextResponse("Invalid receipt file format", { status: 400 });
//     // }

//     console.log(body);

//     const result = await prisma.insurance_files.create({
//       data: {
//         order: body.id, 
//         name: body.name,
//         mimetype: body.mimetype.toLowerCase() as MimeType,
//         data: body.data,
//       },
//       select: { id: true },
//     });

//     return NextResponse.json({ id: result.id });
//   } catch (error) {
//     console.error("Error uploading receipt:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }