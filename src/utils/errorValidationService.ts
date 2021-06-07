import mongoose from 'mongoose';

import { ErrorExt } from '../interfaces/ErrorExt';


export const errorGeneralValidation = (err: ErrorExt, VALIDATION_ERROR: string) => {
  const error = new Error(VALIDATION_ERROR) as ErrorExt;
  error.reason = err.message;
  throw error;
};

export const errorIdValidation = (id: string, VALIDATION_ERROR: string) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    const error = new Error(VALIDATION_ERROR) as ErrorExt;
    error.reason = `Given ID is not valid: ${id}`;
    throw error;
  }
};

export const errorNotFound = (item: string, NOT_FOUND: string) => {
  const error = new Error(NOT_FOUND) as ErrorExt;
  error.reason = item;
  throw error;
};
