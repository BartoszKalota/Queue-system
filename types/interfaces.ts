export interface quequeQuery {
  agents?: object;
};

export interface mapQueueDataInterface {
  members: string[];
  agents: string[];
  _id: string;
  name: string;
  __v: number
};

export interface getAgentData {
  _id: string;
  name: string;
  active: boolean;
  position: string;
  __v: number;
  queues: Array<object>;
}