import { Document } from 'mongoose';

import {
  getQueue as dbGetQueue,
  addToQueue as dbAddToQueue,
  removeFromQueue as dbRemoveFromQueue
} from '../models/queue';

import { VALIDATION_ERROR, NOT_FOUND } from '../constants/error';
import { errorIdValidation, errorNotFound } from '../utils/errorValidationService';

export default class Agent {
  // Getters
  async getQueue(queueId: string): Promise<Pick<Document, "_id"> | null> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const queueData = await dbGetQueue(queueId);
    if (!queueData) errorNotFound('Queue', NOT_FOUND);
    return queueData;
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

    await dbRemoveFromQueue(queueId, userId);
    return true;
  }
}