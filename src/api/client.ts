import express from 'express';

const { Router } = express;
const clientRouter = Router();

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

clientRouter.post('/addToQueue', (req, res): object => {
  try {
    return res.json({
      id: '456456456456456456456456'
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message
    });
  }
});

export default clientRouter;