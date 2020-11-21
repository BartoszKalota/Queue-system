import express from 'express';

import Admin from '../services/admin';

const { Router } = express;
const adminRouter = Router();

const admin = new Admin();

// Queue
adminRouter.put('/queue', async (req, res): Promise<object> => {
  try {
    const id = await admin.addQueue(req.body);
    return res.json({
      id
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
  }
});

adminRouter.delete('/queue', (req, res): object => {
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

// Agent
adminRouter.put('/agent', (req, res): object => {
  try {
    return res.json({
      id: '123123123123123123123123'
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
  }
});

adminRouter.delete('/agent', (req, res): object => {
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

// Assign/Unassign agent to queue
adminRouter.post('/assignQueue', (req, res): object => {
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