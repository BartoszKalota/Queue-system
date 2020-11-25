import { Document } from 'mongoose';

import {
  getQueue as dbGetQueue,
  getQueues as dbGetQueues,
  addToQueue as dbAddToQueue,
  removeFromQueue as dbRemoveFromQueue
} from '../models/queue';
import {
  getAgent as dbGetAgent
} from '../models/agent';

import { VALIDATION_ERROR, NOT_FOUND } from '../constants/error';
import { errorIdValidation, errorNotFound } from '../utils/errorValidationService';

export default class Agent {
  // Internal getters
  async getQueue(queueId: string): Promise<Pick<Document, "_id"> | null> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const queueData = await dbGetQueue(queueId);
    if (!queueData) errorNotFound('Queue', NOT_FOUND);
    return queueData;
  }

  // Agent and its queues
  async getAgent(agentId: string): Promise<object> {
    errorIdValidation(agentId, VALIDATION_ERROR);

    const agentData = await dbGetAgent(agentId);
    if (!agentData) errorNotFound('Agent', NOT_FOUND);

    const queues = await dbGetQueues(agentId);
    return {
      ...agentData,
      queues
    }
  }

  // Client-Queue management
  async addToQueue(queueId: string, userId: string): Promise<boolean> {
    await this.getQueue(queueId);
    errorIdValidation(userId, VALIDATION_ERROR);

    await dbAddToQueue(queueId, userId);
    return true;
  }

  async removeFromQueue(queueId: string, userId: string): Promise<boolean> {
    await this.getQueue(queueId);
    errorIdValidation(userId, VALIDATION_ERROR);

    const result: any = await dbRemoveFromQueue(queueId, userId);
    if (result.nModified === 0) errorNotFound('Client', NOT_FOUND);
    
    return true;
  }
}