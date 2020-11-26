import express from 'express';

import Agent from '../services/agent';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

import { SessionExt } from '../../types/session';

const { Router } = express;
const agentRouter = Router();

const agent = new Agent();

// View
agentRouter.get('/', async (req, res): Promise<void> => {
  const { agentId }: SessionExt = req.session;
  
  try {
    if (agentId) {
      const agentData = await agent.getAgent(agentId);
      return res.render('agent/queues', agentData);
    }
    return res.render('agent/login');
  } catch (err) {
    return res.render('agent/fail', {
      message: err.message,
      reason: err.reason
    });
  }
});

// Logging
agentRouter.post('/login', async (req: any, res): Promise<void> => {
  try {
    const agentId = req.body.id;
    if (!agentId) throw new Error(MISSING_DATA);

    await agent.getAgent(agentId);
    req.session.agentId = agentId;
    return res.redirect('/agent');
  } catch (err) {
    return res.render('agent/fail', {
      message: err.message,
      reason: err.reason
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

agentRouter.post('/removeClientFromQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);

    await agent.removeFromQueue(req.body.queueId, req.body.userId);
    console.log(`Client with ID ${req.body.userId} was unassigned from the queue with ID ${req.body.queueId} successfully!`);
    return res.json({
      ok: 'ok'
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

export default agentRouter;