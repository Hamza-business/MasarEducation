import { useState, useEffect, useCallback, useMemo } from 'react';
import { AgentInfo } from '@/types/all';
import { fetchAgentByCode, fetchAgentsByParent, getAgentImageById } from '@/lib/agent';

interface UseAgentDataProps {
  parentCode: string;
}

interface UseAgentDataReturn {
  parentid: number;
  parentLVL: number;
  agentName: string;
  agents: AgentInfo[];
  filtered: AgentInfo[];
  setFiltered: (agents: AgentInfo[]) => void;
  updateAgent: (agentId: number, updates: Partial<AgentInfo>) => void;
  loadAgentImage: (agentId: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useAgentData({ parentCode }: UseAgentDataProps): UseAgentDataReturn {
  const [parentid, setParentid] = useState<number>(0);
  const [parentLVL, setParentLVL] = useState<number>(3);
  const [agentName, setAgentName] = useState<string>("");
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [filtered, setFiltered] = useState<AgentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch parent agent info
  useEffect(() => {
    let isMounted = true;
    
    const fetchParentInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchAgentByCode(parentCode);
        if (isMounted) {
          setParentid(res.id);
          setParentLVL(res.lvl);
          setAgentName(res.agent_name);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch parent agent info');
          console.error('Error fetching parent agent:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchParentInfo();
    
    return () => {
      isMounted = false;
    };
  }, [parentCode]);

  // Fetch agents by parent
  useEffect(() => {
    if (parentid === 0) return;
    
    let isMounted = true;
    
    const fetchAgents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAgentsByParent(parentid.toString());
        if (isMounted) {
          setAgents(data);
          setFiltered(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch agents');
          console.error('Error fetching agents:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAgents();
    
    return () => {
      isMounted = false;
    };
  }, [parentid]);

  // Update agent function that prevents infinite loops
  const updateAgent = useCallback((agentId: number, updates: Partial<AgentInfo>) => {
    setAgents(prevAgents => {
      const updatedAgents = prevAgents.map(agent => 
        agent.id === agentId ? { ...agent, ...updates } : agent
      );
      
      // Update filtered array only if it contains the updated agent
      setFiltered(prevFiltered => 
        prevFiltered.map(agent => 
          agent.id === agentId ? { ...agent, ...updates } : agent
        )
      );
      
      return updatedAgents;
    });
  }, []);

  // Load agent image without causing re-renders
  const loadAgentImage = useCallback(async (agentId: number) => {
    try {
      const agent = agents.find(a => a.id === agentId);
      if (!agent || agent.image.data) return; // Already loaded

      const imageData = await getAgentImageById(agentId);
      if (imageData) {
        updateAgent(agentId, {
          image: {
            data: imageData.data,
            mimetype: imageData.mimetype,
            name: imageData.name,
          }
        });
      }
    } catch (err) {
      console.error('Error loading agent image:', err);
    }
  }, [agents, updateAgent]);

  return {
    parentid,
    parentLVL,
    agentName,
    agents,
    filtered,
    setFiltered,
    updateAgent,
    loadAgentImage,
    isLoading,
    error,
  };
}
