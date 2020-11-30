import mongoose from 'mongoose';

import { ErrorExt } from '../../types/errorExt';

export const errorGeneralValidation = (err: ErrorExt, VALIDATION_ERROR: string) => {
  const error: ErrorExt = new Error(VALIDATION_ERROR);
  error.reason = err.message;
  throw error;
};

export const errorIdValidation = (id: string, VALIDATION_ERROR: string) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    const error: ErrorExt = new Error(VALIDATION_ERROR);
    error.reason = `Given ID is not valid: ${id}`;
    throw error;
  }
};

export const errorNotFound = (item: string, NOT_FOUND: string) => {
  const error: ErrorExt = new Error(NOT_FOUND);
  error.reason = item;
  throw error;
};