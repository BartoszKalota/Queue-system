import express from 'express';

import Agent from '../services/agent';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const agentRouter = Router();

const agent = new Agent();

// View
agentRouter.get('/', (req, res): object => {
  try {
    return res.json({
      message: 'This will show agents view'
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
  }
});

// Logging
agentRouter.post('/login', (req, res): object => {
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

agentRouter.post('/logout', (req, res): object => {
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

// Client-Queue management
agentRouter.post('/addClientToQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);

    await agent.addToQueue(req.body.queueId, req.body.userId);
    console.log(`Client with ID ${req.body.userId} was assigned to the queue with ID ${req.body.queueId} successfully!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

agentRouter.post('/removeClientFromQueue', (req, res): object => {
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

export default agentRouter;