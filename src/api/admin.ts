import express from 'express';

import Admin from '../services/admin';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const adminRouter = Router();

const admin = new Admin();

// Create queue
adminRouter.put('/queue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    const id = await admin.addQueue(req.body);
    console.log(`[ ADMIN Create queue ]: Queue named '${req.body.name}' was created!`);
    return res.json({
      id
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Delete queue
adminRouter.delete('/queue', async (req, res): Promise<object | void> => {
  try {
    const id = req.query.id;
    if (!id) throw new Error(MISSING_DATA);

    await admin.removeQueue(`${id}`); // in template string to match the types for typescript
    console.log(`[ ADMIN Delete queue ]: Queue with ID ${id} was deleted!`);
    return res.json({
      ok: 'ok'
    })
  } catch (err) {
    errorResponse(err, res);
  }
});

// Create agent
adminRouter.put('/agent', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    const id = await admin.addAgent(req.body);
    console.log(`[ ADMIN Create agent ]: Agent named ${req.body.name} was created!`);
    return res.json({
      id
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Delete agent
adminRouter.delete('/agent', async (req, res): Promise<object | void> => {
  try {
    const id = req.query.id;
    if (!id) throw new Error(MISSING_DATA);
    
    await admin.removeAgent(`${id}`); // in template string to match the types for typescript
    console.log(`[ ADMIN Delete agent ]: Agent with ID ${id} was deleted!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Assign agent to queue
adminRouter.post('/assignQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);

    await admin.assignToQueue(req.body.queueId, req.body.agentId);
    console.log(`[ ADMIN Assign agent to queue ]: Agent with ID ${req.body.agentId} was assigned to the queue with ID ${req.body.queueId} successfully!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Unassign agent from queue
adminRouter.post('/unassignQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    await admin.unassignFromQueue(req.body.queueId, req.body.agentId);
    console.log(`[ ADMIN Unassign agent from queue ]: Agent with ID ${req.body.agentId} was unassigned from the queue with ID ${req.body.queueId} successfully!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

export default adminRouter;