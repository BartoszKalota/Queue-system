import mongoose from 'mongoose';

import {
  addQueue as dbAddQueue,
  removeQueue as dbRemoveQueue
} from '../models/queue';
import {
  addAgent as dbAddAgent,
  removeAgent as dbRemoveAgent
} from '../models/agent';

import { VALIDATION_ERROR, NOT_FOUND } from '../constants/error';
import errorValidationService from '../utils/errorValidationService';

import { ErrorExt } from '../../types/errorExt';

export default class Admin {
  // Queue
  async addQueue(queueName: string): Promise<string | void> {
    try {
      return await dbAddQueue(queueName);
    } catch (err) {
      errorValidationService(err, VALIDATION_ERROR);
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
  async addAgent(agentData: object): Promise<string | void> {
    try {
      return await dbAddAgent(agentData);
    } catch (err) {
      errorValidationService(err, VALIDATION_ERROR);
    }
  }

  async removeAgent(agentId: string): Promise<boolean> {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(agentId);
    if (!isValidObjectId) {
      const error: ErrorExt = new Error(VALIDATION_ERROR);
      error.reason = `Given ID is not valid: ${agentId}`;
      throw error;
    }

    const result = await dbRemoveAgent(agentId);
    if (result === 0) throw new Error(NOT_FOUND);
    return true;
  }
}