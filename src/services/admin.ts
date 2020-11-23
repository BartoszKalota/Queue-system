import {
  addQueue as dbAddQueue,
  removeQueue as dbRemoveQueue
} from '../models/queue';
import {
  addAgent as dbAddAgent,
  removeAgent as dbRemoveAgent
} from '../models/agent';

import { VALIDATION_ERROR, NOT_FOUND } from '../constants/error';
import { errorGeneralValidation, errorIdValidation } from '../utils/errorValidationService';

export default class Admin {
  // Queue
  async addQueue(queueName: string): Promise<string | void> {
    try {
      return await dbAddQueue(queueName);
    } catch (err) {
      errorGeneralValidation(err, VALIDATION_ERROR);
    }
  }

  async removeQueue(queueId: string): Promise<boolean> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const result = await dbRemoveQueue(queueId);
    if (result === 0) throw new Error(NOT_FOUND);
    return true;
  }

  // Agent
  async addAgent(agentData: object): Promise<string | void> {
    try {
      return await dbAddAgent(agentData);
    } catch (err) {
      errorGeneralValidation(err, VALIDATION_ERROR);
    }
  }

  async removeAgent(agentId: string): Promise<boolean> {
    errorIdValidation(agentId, VALIDATION_ERROR);

    const result = await dbRemoveAgent(agentId);
    if (result === 0) throw new Error(NOT_FOUND);
    return true;
  }
}