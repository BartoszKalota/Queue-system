import express from 'express';

import Client from '../services/client';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

import { ClientRequestI, CustomRequest } from '../interfaces/CustomRequest';
import { ErrorExt } from '../interfaces/ErrorExt';


const { Router } = express;
const clientRouter = Router();

const client = new Client();

// Main view
clientRouter.get('/', async (_, res) => {
  try {
    const queues = await client.getQueues();
    return res.render('client/queues', { queues });
  } catch (err) {
    const errCopy = err as ErrorExt;
    errorResponse(errCopy, res);
  }
});

// Requested by axios from client JS code (src/client)
clientRouter.get('/queues', async (_, res) => {
  try {
    const queues = await client.getQueues();
    return res.json({ queues });
  } catch (err) {
    const errCopy = err as ErrorExt;
    errorResponse(errCopy, res);
  }
});

// Add client to queue
clientRouter.post('/addToQueue', async (req: CustomRequest<ClientRequestI>, res) => {
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
    const errCopy = err as ErrorExt;
    return res.render('client/fail', {
      message: errCopy.message,
      reason: errCopy.reason
    });
  }
});

export default clientRouter;
