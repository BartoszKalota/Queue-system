import express from 'express';

const { Router } = express;
const agentRouter = Router();

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
agentRouter.post('/addClientToQueue', (req, res): object => {
  try {
    return res.json({
      id: '567567567567567567567567'
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
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