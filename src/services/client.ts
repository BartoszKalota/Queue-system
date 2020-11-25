import {
  addToQueue as dbAddToQueue
} from '../models/queue';
import mapQueueData from '../utils/mapQueueData';

import { VALIDATION_ERROR } from '../constants/error';
import { errorIdValidation } from '../utils/errorValidationService';

export default class Client {
  async addToQueue(queueId: string): Promise<any> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const queueData = await dbAddToQueue(queueId, '');
    const queueDataForClient = mapQueueData(queueData);
    return {
      userId: queueData.members[queueData.members.length - 1],
      ...queueDataForClient
    };
  }
}