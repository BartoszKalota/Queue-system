import { AgentI } from './AgentI';


export interface GetAgentDataI extends AgentI {
  queues: {
    id: string | undefined;
    _id?: string;
    members: string[];
    agents: string[];
    name: string;
    nModified: number;
  }[];
}
