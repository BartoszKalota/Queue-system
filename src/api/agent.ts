import express from 'express';

import Agent from '../services/agent';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

import { SessionExt } from '../interfaces/SessionExt';
import { CustomRequest, AgentRequestI } from '../interfaces/CustomRequest';
import { ErrorExt } from '../interfaces/ErrorExt';
import { AgentI } from '../interfaces/AgentI';


const { Router } = express;
const agentRouter = Router();

const agent = new Agent();

// Main view
agentRouter.get('/', async (req, res) => {
  const { agentId }: SessionExt = req.session;
  
  try {
    if (agentId) {
      const agentData = await agent.getAgent(agentId);
      return res.render('agent/queues', agentData);
    }
    return res.render('agent/login');
  } catch (err) {
    const errCopy = err as ErrorExt;
    return res.render('agent/fail', {
      message: errCopy.message,
      reason: errCopy.reason
    });
  }
});

// Requested by axios from client JS code (src/client)
agentRouter.get('/agentData', async (req, res) => {
  const { agentId }: SessionExt = req.session;
  if (!agentId) {
    return res.json({ agentData: {} });
  }

  try {
    const agentData = await agent.getAgent(agentId);
    return res.json({ agentData });
  } catch (err) {
    const errCopy = err as ErrorExt;
    errorResponse(errCopy, res);
  }
});

// Log in
agentRouter.post('/login', async (req: CustomRequest<AgentRequestI>, res) => {
  try {
    const agentId = req.body.id;
    if (!agentId) throw new Error(MISSING_DATA);

    const { name: agentName } = await agent.getAgent(agentId) as AgentI;
    const session = req.session as SessionExt;
    session.agentId = agentId;
    console.log(`[ Logged in ]: Agent ${agentName} with ID ${agentId}`);
    return res.redirect('/agent');
  } catch (err) {
    const errCopy = err as ErrorExt;
    return res.render('agent/fail', {
      message: errCopy.message,
      reason: errCopy.reason
    });
  }
});

// Log out
agentRouter.post('/logout', async (req, res) => {
  try {
    const session = req.session as SessionExt;
    const agentData = await agent.getAgent(session.agentId!) as AgentI;
    console.log(`[ Logged out ]: Agent ${agentData.name} with ID ${agentData._id}`);
    req.session.destroy(() => null); // Typescript enforced using argmument as a callback
    return res.redirect('/agent');
  } catch (err) {
    const errCopy = err as ErrorExt;
    return res.render('agent/fail', {
      message: errCopy.message,
      reason: errCopy.reason
    });
  }
});

// Add client to queue
agentRouter.post('/addClientToQueue', async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);

    await agent.addToQueue(req.body.queueId, req.body.userId);
    console.log(`[ Add client to queue ]: Client with ID ${req.body.userId} was assigned to the queue with ID ${req.body.queueId} successfully!`);
    return res.render('agent/success');
  } catch (err) {
    const errCopy = err as ErrorExt;
    return res.render('agent/fail', {
      message: errCopy.message,
      reason: errCopy.reason
    });
  }
});

// Remove client from queue
agentRouter.post('/removeClientFromQueue', async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);

    await agent.removeFromQueue(req.body.queueId, req.body.userId);
    console.log(`[ Remove client from queue ]: Client with ID ${req.body.userId} was unassigned from the queue with ID ${req.body.queueId} successfully!`);
    return res.render('agent/success');
  } catch (err) {
    const errCopy = err as ErrorExt;
    return res.render('agent/fail', {
      message: errCopy.message,
      reason: errCopy.reason
    });
  }
});

export default agentRouter;
