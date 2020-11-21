import mongoose from 'mongoose';

import { strFunct } from '../../types/functions';

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