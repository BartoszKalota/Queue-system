import express from 'express';

import Admin from '../services/admin';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const adminRouter = Router();

const admin = new Admin();

// Queue
adminRouter.put('/queue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    const id = await admin.addQueue(req.body);
    console.log(`Queue named '${req.body.name}' was created!`);
    return res.json({
      id
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

adminRouter.delete('/queue', async (req, res): Promise<object | void> => {
  try {
    const id = req.query.id;
    if (!id) throw new Error(MISSING_DATA);

    await admin.removeQueue(`${id}`); // in template string to match the types for typescript
    console.log(`Queue with ID ${id} was deleted!`);
    return res.json({
      ok: 'ok'
    })
  } catch (err) {
    errorResponse(err, res);
  }
});

// Agent
adminRouter.put('/agent', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    const id = await admin.addAgent(req.body);
    console.log(`Agent named ${req.body.name} was created!`);
    return res.json({
      id
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

adminRouter.delete('/agent', async (req, res): Promise<object | void> => {
  try {
    const id = req.query.id;
    if (!id) throw new Error(MISSING_DATA);
    
    await admin.removeAgent(`${id}`); // in template string to match the types for typescript
    console.log(`Agent with ID ${id} was deleted!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Assign/Unassign agent to queue
adminRouter.post('/assignQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);

    await admin.assignToQueue(req.body.queueId, req.body.agentId);
    console.log(`Agent with ID ${req.body.agentId} was assigned to the queue with ID ${req.body.queueId} successfully!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

adminRouter.post('/unassignQueue', (req, res): object => {
  try {
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
  }
});

export default adminRouter;