export interface QueueI {
  _id?: string;
  members: string[];
  agents: string[];
  name: string;
  nModified: number;
}
