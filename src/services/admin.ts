import { Document, Error } from 'mongoose';

import {
  getQueue as dbGetQueue,
  addQueue as dbAddQueue,
  removeQueue as dbRemoveQueue,
  assignToQueue as dbAssignToQueue,
  unassignFromQueue as dbUnassignFromQueue
} from '../models/queue';
import {
  getAgent as dbGetAgent,
  addAgent as dbAddAgent,
  removeAgent as dbRemoveAgent
} from '../models/agent';

import { VALIDATION_ERROR, NOT_FOUND } from '../constants/error';
import {
  errorGeneralValidation,
  errorIdValidation,
  errorNotFound
} from '../utils/errorValidationService';

import { AgentI } from '../interfaces/AgentI';


export default class Admin {
  // Internal getters
  async getQueue(queueId: string): Promise<Pick<Document, "_id"> | null> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const queueData = await dbGetQueue(queueId);
    if (!queueData) errorNotFound('Queue', NOT_FOUND);
    return queueData;
  }

  async getAgent(agentId: string): Promise<Pick<Document, "_id"> | null> {
    errorIdValidation(agentId, VALIDATION_ERROR);

    const agentData = await dbGetAgent(agentId);
    if (!agentData) errorNotFound('Agent', NOT_FOUND);
    return agentData;
  }

  // Queue
  async addQueue(queueName: string): Promise<string | void> {
    try {
      return await dbAddQueue(queueName);
    } catch (err) {
      const errCopy = err as Error;
      errorGeneralValidation(errCopy, VALIDATION_ERROR);
    }
  }

  async removeQueue(queueId: string): Promise<boolean> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const result = await dbRemoveQueue(queueId);
    if (result === 0) errorNotFound('Queue', NOT_FOUND);
    return true;
  }

  // Agent
  async addAgent(agentData: AgentI): Promise<string | void> {
    try {
      return await dbAddAgent(agentData);
    } catch (err) {
      const errCopy = err as Error;
      errorGeneralValidation(errCopy, VALIDATION_ERROR);
    }
  }

  async removeAgent(agentId: string): Promise<boolean> {
    errorIdValidation(agentId, VALIDATION_ERROR);

    const result = await dbRemoveAgent(agentId);
    if (result === 0) errorNotFound('Agent', NOT_FOUND);
    return true;
  }

  // Assign/Unassign agent to queue
  async assignToQueue(queueId: string, agentId: string): Promise<boolean> {
    await this.getQueue(queueId);
    await this.getAgent(agentId);
    await dbAssignToQueue(queueId, agentId);
    return true;
  }

  async unassignFromQueue(queueId: string, agentId: string): Promise<boolean> {
    await this.getQueue(queueId);
    await this.getAgent(agentId);
    
    const result = await dbUnassignFromQueue(queueId, agentId);
    if (result.nModified === 0) errorNotFound('Agent', NOT_FOUND);

    return true;
  }
}
