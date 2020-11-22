import {
  addQueue as dbAddQueue
} from '../models/queue';

import { VALIDATION_ERROR } from '../constants/error';

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
}