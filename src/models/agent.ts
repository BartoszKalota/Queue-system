import mongoose from 'mongoose';

import { objFunct, strFunct } from '../../types/functions';

export const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

export const Agent = mongoose.model('Agent', agentSchema, 'agents');

export const getAgent: strFunct = async (agentId) => {
  return await Agent
    .findOne({
      _id: agentId
    })
    .lean()
    .exec();
};

export const addAgent: objFunct = async (agentData) => {
  const result = new Agent(agentData);
  await result.save();
  return result._id;
};

export const removeAgent: strFunct = async (agentId) => {
  const result = await Agent
    .deleteOne({
      _id: agentId
    })
    .exec();
    
  return result.deletedCount;
};