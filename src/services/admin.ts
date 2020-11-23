import mongoose from 'mongoose';

import {
  addQueue as dbAddQueue,
  removeQueue as dbRemoveQueue
} from '../models/queue';
import {
  addAgent as dbAddAgent
} from '../models/agent';

import { VALIDATION_ERROR, NOT_FOUND } from '../constants/error';

import { ErrorExt } from '../../types/errorExt';

export default class Admin {
  // Queue
  async addQueue(queueName: string): Promise<string> {
    try {
      return await dbAddQueue(queueName);
    } catch (err) {
      const error: ErrorExt = new Error(VALIDATION_ERROR);
      error.reason = err.message;
      throw error;
    }
  }

  async removeQueue(queueId: string): Promise<boolean> {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(queueId);
    if (!isValidObjectId) {
      const error: ErrorExt = new Error(VALIDATION_ERROR);
      error.reason = `Given ID is not valid: ${queueId}`;
      throw error;
    }

    const result = await dbRemoveQueue(queueId);
    if (result === 0) throw new Error(NOT_FOUND);
    return true;
  }

  // Agent
  async addAgent(agentData: object): Promise<string> {
    try {
      return await dbAddAgent(agentData);
    } catch (err) {
      const error: ErrorExt = new Error(VALIDATION_ERROR);
      error.reason = err.message;
      throw error;
    }
  }
}