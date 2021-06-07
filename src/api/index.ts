import express from 'express';

import adminRouter from './admin';
import agentRouter from './agent';
import clientRouter from './client';


const { Router } = express;
const apiRouter = Router();

apiRouter.use('/admin', adminRouter);
apiRouter.use('/agent', agentRouter);
apiRouter.use('/client', clientRouter);

// 404 supports
apiRouter.use((_, res) => {
  return res.status(404).json({
    message: 'Not found',
    status: 404,
  });
});

export default apiRouter;
