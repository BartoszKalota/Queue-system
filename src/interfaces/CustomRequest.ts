import { Request } from 'express';


export interface CustomRequest<T> extends Request {
  body: T;
}

export interface AgentRequestI {
  id: string;
}

export interface ClientRequestI {
  id: string;
}
