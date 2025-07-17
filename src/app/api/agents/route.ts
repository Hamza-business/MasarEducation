import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { AgentInfo } from '@/types/all';

export async function GET(req: NextRequest) {
  try {
        const id = req.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: 'Invalid agent ID' }, { status: 400 });
        }
        const result = await sql.query(`
            SELECT
            ai.id,
            ai.name AS agent_name,
            ai.lvl,
            ai.percent,
            ai.url,
            ai.active,
            ai.created_at,
            
            -- Parent agent
            pai.id AS parent_id,
            pai.name AS parent_name,

            -- User info
            u.id AS user_id,
            u.email,
            u.name AS user_name,
            u.created_at AS user_created_at

            FROM agents.agent_info ai
            LEFT JOIN agents.agent_info pai ON ai.parent_agent = pai.id
            JOIN agents.users u ON ai.userid = u.id
            LEFT JOIN files.agent_images img ON ai.agent_image = img.id
            WHERE ai.parent_agent = ${id}
            ORDER BY ai.created_at DESC;
        `);

        const agents: AgentInfo[] = result.map(row => ({
            id: row.id,
            agent_name: row.agent_name,
            lvl: row.lvl,
            percent: row.percent,
            url: row.url,
            active: row.active,
            created_at: row.created_at,
            parent: row.parent_id ? { id: row.parent_id, name: row.parent_name }: null,
            user: {
            id: row.user_id,
            email: row.email,
            name: row.user_name,
            created_at: row.user_created_at,
            },
            image: row.image_id
                ? {
                id: row.image_id,
                name: row.image_name,
                mimetype: row.image_type,
                data: row.image_data,
                }
            : null,
        }));

        return NextResponse.json(agents);
  } catch (error) {
    console.error('[FETCH_ORDERS_SQL_ERROR]', error);
    throw new Error('Failed to fetch agents from SQL database.');
  }
}
