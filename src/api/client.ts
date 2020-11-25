import express from 'express';

import Client from '../services/client';

import { MISSING_DATA } from '../constants/error';
import errorResponse from '../utils/errorResponse';

const { Router } = express;
const clientRouter = Router();

const client = new Client();

clientRouter.get('/', (req, res): object => {
  try {
    return res.json({
      message: 'Client view'
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
  }
});

clientRouter.post('/addToQueue', async (req, res): Promise<object | void> => {
  try {
    if (!Object.keys(req.body).length) throw new Error(MISSING_DATA);
    
    const { id } = req.body;
    const { userId } = await client.addToQueue(id);
    console.log(`Client was added to the queue with ID: ${id}`);
    console.log(`Client ID is: ${userId}`);
    return res.json({
      id: userId
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

export default clientRouter;