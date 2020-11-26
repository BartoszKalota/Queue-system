import { SessionData } from 'express-session';

export interface SessionExt extends SessionData {
  agentId?: string;
}