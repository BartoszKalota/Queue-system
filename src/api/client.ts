import express from 'express';

import Client from '../services/client';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const clientRouter = Router();

const client = new Client();

// Main view
clientRouter.get('/', async (req, res): Promise<object | void> => {
  try {
    const queues = await client.getQueues();
    return res.render('client/queues', { queues });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Requested by axios from client JS code (src/client)
clientRouter.get('/queues', async (req, res): Promise<object | void> => {
  try {
    const queues = await client.getQueues();
    return res.json({ queues });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Add client to queue
clientRouter.post('/addToQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    const { id } = req.body;
    const queue = await client.addToQueue(id);
    console.log(`Client was added to the queue with ID: ${id}`);
    console.log(`Client ID is: ${queue.userId}`);
    return res.render('client/success', {
      id: queue.userId,
      name: queue.name,
      size: queue.length - 1
    });
  } catch (err) {
    return res.render('client/fail', {
      message: err.message,
      reason: err.reason
    });
  }
});

export default clientRouter;