// app/api/agents/[id]/image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(req: NextRequest, { params }: any) {
    try {
        const id = Number(await params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid agent ID' }, { status: 400 });
        }

        const rows = await sql`
            SELECT img.id, img.name, img.mimetype, img.data
            FROM agents.agent_info ai
            JOIN files.agent_images img ON ai.agent_image = img.id
            WHERE ai.id = ${id};
        `;

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: rows[0].id,
            name: rows[0].name,
            mimetype: rows[0].mimetype,
            data: rows[0].data,
        });
    } catch(error){
        return NextResponse.json({ error: "Failed to update bank info." }, { status: 500 });
    }
}
