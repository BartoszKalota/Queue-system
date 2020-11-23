import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import { quequeQuery } from '../../types/queries';

import { Agent } from './agent';

export const queueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    // At mongoose.Schema.ObjectId there was an error info:
    // Property 'ObjectId' does not exist on type 'typeof Schema'
    type: [mongoose.Types.ObjectId],
    required: true
  },
  agents: {
    type: [mongoose.Types.ObjectId],
    ref: Agent
  }
});

export const Queue = mongoose.model('Queue', queueSchema, 'queues');

export const getQueue = async (queueId: string): Promise<any> => {
  return await Queue
    .findOne({
      _id: queueId
    })
    .lean()
    .exec();
};

export const getQueues = async (agentId: string): Promise<any> => {
  const query: quequeQuery = {};

  if (agentId) {
    query.agents = {
      '$in': [agentId]
    }
  }

  return await Queue
    .findOne(query)
    .lean()
    .exec();
};

export const addQueue = async (queueName: string): Promise<string> => {
  const result = new Queue(queueName);
  await result.save();
  return result._id;
};

export const removeQueue = async (queueId: string): Promise<number | undefined> => {
  const result = await Queue
    .deleteOne({
      _id: queueId
    })
    .exec();
  
  return result.deletedCount;
};

export const assignToQueue = async (queueId: string, agentId: string): Promise<any> => {
  return await Queue
    .updateOne({
      _id: queueId
    }, {
      '$addToSet': {
        agents: agentId
      }
    })
    .exec();
};

export const unassignFromQueue = async (queueId: string, agentId: string): Promise<any> => {
  return await Queue
    .updateOne({
      _id: queueId
    }, {
      '$pull': {
        agents: agentId
      }
    })
    .exec();
};

export const addToQueue = async (queueId: string, userId: string): Promise<any> => {
  const newId = userId || new ObjectId();

  const queue: any = await Queue
    .findOneAndUpdate({
      _id: queueId
    }, {
      '$addToSet': {
        members: newId
      }
    })
    .exec();

  return {
    ...queue.toObject(),
    members: [...queue.members, newId]
  }
};

export const removeFromQueue = async (queueId: string, userId: string): Promise<any> => {
  return await Queue
    .updateOne({
      _id: queueId
    }, {
      '$pull': {
        members: userId
      }
    })
    .exec();
};