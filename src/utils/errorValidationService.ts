import { ErrorExt } from '../../types/errorExt';

export default (err: ErrorExt, VALIDATION_ERROR: string) => {
  const error: ErrorExt = new Error(VALIDATION_ERROR);
  error.reason = err.message;
  throw error;
};