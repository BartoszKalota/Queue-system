import express from 'express';

const { Router } = express;
const adminRouter = Router();

// Queue
adminRouter.put('/queue', (req, res): object => {
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