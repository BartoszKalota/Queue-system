import mongoose from 'mongoose';

import { DB_ADDRESS, DB_NAME, DB_PORT } from '../config/db';


export const connectToMongoose = async () => {
  const url = `mongodb://${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`;

  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useFindAndModify: false,  // since method .findOneAndUpdate was marked as deprecated
    useNewUrlParser: true
  });
};
