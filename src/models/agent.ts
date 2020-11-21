import mongoose from 'mongoose';

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

export const getAgent = async (agentId: string): Promise<any> => {
  return await Agent
    .findOne({
      _id: agentId
    })
    .lean()
    .exec();
};

export const addAgent = async (agentData: object): Promise<any> => {
  const result = new Agent(agentData);
  await result.save();
  return result._id;
};

export const removeAgent = async (agentId: string): Promise<any> => {
  const result = await Agent
    .deleteOne({
      _id: agentId
    })
    .exec();
    
  return result.deletedCount;
};