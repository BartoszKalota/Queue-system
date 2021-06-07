import {
  getQueues as dbGetQueues,
  addToQueue as dbAddToQueue
} from '../models/queue';

import { VALIDATION_ERROR } from '../constants/error';
import { errorIdValidation } from '../utils/errorValidationService';

import { MapQueueDataI } from '../interfaces/MapQueueDataI';
import { GetQueueDataI } from '../interfaces/GetQueueDataI';
import { ClientInQueueI } from '../interfaces/ClientInQueueI';
import { QueueI } from '../interfaces/QueueI';


export default class Client {
  // Internal filter
  mapQueueData({ members, _id, name }: GetQueueDataI): MapQueueDataI {
    return {
      name,
      id: _id,
      length: members.length
    };
  };

  async getQueues(): Promise<MapQueueDataI[]> {
    const queues = await dbGetQueues('') as QueueI[];
    return queues.map((queue: QueueI): MapQueueDataI => this.mapQueueData(queue));
  }

  async addToQueue(queueId: string): Promise<ClientInQueueI> {
    errorIdValidation(queueId, VALIDATION_ERROR);

    const queueData = await dbAddToQueue(queueId, '');
    const queueDataForClient = this.mapQueueData(queueData);
    return {
      userId: queueData.members[queueData.members.length - 1],
      ...queueDataForClient
    };
  }
}
