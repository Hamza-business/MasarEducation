import { agentImageType, agentInfoType, agentUserType, AgentInfo } from "@/types/all";

export async function checkUniqueEmail(email: string): Promise<boolean> {
  try {
    const res = await fetch("/api/agent/isEmailUnique", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    return data.isUnique;
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    return false;
  }
}

export async function checkUniqueLink(url: string): Promise<boolean> {
  try {
    const res = await fetch("/api/agent/isLinkUnique", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    return data.isUnique;
  } catch (error) {
    console.error("Error checking url uniqueness:", error);
    return false;
  }
}

export async function uploadAgentLogoToDB(file: agentImageType): Promise<number> {
    try {
        const res = await fetch("/api/agent/agentLogo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(file),
        });
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }
        const data = await res.json();
        const id = data.id;
        return id;
    } catch (error) {
        console.error("Error Uploading Agent Logo:", error);
        return 0;
    }
}

export async function storeOwnerInfoToDB(info: agentUserType): Promise<agentUserType> {
    const res = await fetch("/api/agent/ownerInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    });
    const data = await res.json();
    console.log(data)
    return data;
}

export async function storeAgentInfoToDB(info: agentInfoType): Promise<agentInfoType> {
    const res = await fetch("/api/agent/agentInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    });
    const data = await res.json();
    return data;
}


export async function onToggleAgentActive(id: number, desiredState: boolean){
    try {
        const res = await fetch(`/api/agents/${id}/toggle-active`, {
            method: 'PATCH',
            body: JSON.stringify({ active: desiredState }),
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error('Failed to update active status');

        return 1;
    } catch (error) {
        return 0;
    }
}

export async function fetchAgentsByParent(id:string): Promise<AgentInfo[]> {
    const query = new URLSearchParams();
    query.append('id', id);
    const res = await fetch(`/api/agents?${query.toString()}`);
    const data = await res.json();
    return data;
}