import { Response } from 'express';

import {
  MISSING_DATA,
  NOT_FOUND,
  VALIDATION_ERROR
} from '../constants/error';

import { ErrorExt } from '../interfaces/ErrorExt';


export default (err: ErrorExt, res: Response) => {
  switch (err.message) {
    case MISSING_DATA: {
      const msg = 'Missing input data';
      console.log(msg);
      return res.status(400).send(msg);
    }
    case VALIDATION_ERROR: {
      const msg = `Validation error \n${err.reason}`;
      console.log(msg);
      return res.status(400).send(msg);
    }
    case NOT_FOUND: {
      const msg = `${err.reason} was not found`;
      console.log(msg);
      return res.status(404).send(msg);
    }
    default: {
      const msg = 'Server error';
      console.log(msg);
      return res.status(500).send(msg);
    }
  }
};
