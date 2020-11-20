import mongoose from 'mongoose';

import { DB_ADDRESS, DB_NAME, DB_PORT } from '../config/db';

export const connectToMongoose: () => Promise<void> = async () => {
  const url: string = `mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`;

  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};
