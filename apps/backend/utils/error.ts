export class CustomError extends Error {
  status: number;
}

export function createError(status: number, message: string) {
  const err = new CustomError();
  err.message = message;
  err.status = status;
  return err;
}
