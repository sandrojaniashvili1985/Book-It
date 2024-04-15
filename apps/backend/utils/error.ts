export class CustomError extends Error {
  status: number;
}

export function createError(status: number, message: any) {
  const err = new CustomError();
  err.message = message;
  err.status = status;
  return err;
}
