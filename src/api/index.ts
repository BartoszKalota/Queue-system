import express from 'express';

import adminRouter from './admin';
import agentRouter from './agent';

const { Router } = express;
const apiRouter = Router();

apiRouter.use('/admin', adminRouter);
apiRouter.use('/agent', agentRouter);

// 404 supports
apiRouter.use((req, res): object => {
  return res.status(404).json({
    message: 'Not found',
    status: 404,
  });
});

export default apiRouter;
