import {
  addToQueue as dbAddToQueue
} from '../models/queue';

import { VALIDATION_ERROR } from '../constants/error';
import { errorIdValidation } from '../utils/errorValidationService';

import { mapQueueDataInterface } from '../../types/interfaces';

export default class Client {
  // Internal filter
  mapQueueData({ members, _id, name }: mapQueueDataInterface) {
    return {
      name,
      id: _id,
      length: members.length
    };
  };

  async addToQueue(queueId: string): Promise<any> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const queueData = await dbAddToQueue(queueId, '');
    const queueDataForClient = this.mapQueueData(queueData);
    return {
      userId: queueData.members[queueData.members.length - 1],
      ...queueDataForClient
    };
  }
}