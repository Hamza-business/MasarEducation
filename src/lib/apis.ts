import { AgentInfo } from "@/types/all";

export async function fetchAgentsByParent(id:string): Promise<AgentInfo[]> {
    const query = new URLSearchParams();
    query.append('id', id);
    const res = await fetch(`/api/agents?${query.toString()}`);
    const data = await res.json();
    return data;
}