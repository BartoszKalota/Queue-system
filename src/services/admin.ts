import {
  addQueue as dbAddQueue
} from '../models/queue';

export default class Admin {
  // Queue
  async addQueue(queueName: string): Promise<string> {
    return await dbAddQueue(queueName);
  }
}