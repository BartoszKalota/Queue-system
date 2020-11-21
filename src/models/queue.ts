import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import { objFunct, strFunct, strTwoArgFunct } from '../../types/functions';
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

export const getQueue: strFunct = async (queueId) => {
  return await Queue
    .findOne({
      _id: queueId
    })
    .lean()
    .exec();
};

export const getQueues: strFunct = async (agentId) => {
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

export const addQueue: objFunct = async (queueData) => {
  const result = new Queue(queueData);
  await result.save();
  return result._id;
};

export const removeQueue: strFunct = async (queueId) => {
  const result = await Queue
    .deleteOne({
      _id: queueId
    })
    .exec();
  
  return result.deletedCount;
};

export const assignToQueue: strTwoArgFunct = async (queueId, agentId) => {
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

export const unassignFromQueue: strTwoArgFunct = async (queueId, agentId) => {
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

export const addToQueue: strTwoArgFunct = async (queueId, userId) => {
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

export const removeFromQueue: strTwoArgFunct = async (queueId, userId) => {
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