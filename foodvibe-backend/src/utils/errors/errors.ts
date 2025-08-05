
export const ErrorResponse = (message: string, statusCode: number) => {
  const err = new Error(message);
  (err as any).statusCode = statusCode;
  return err;
};

export default ErrorResponse;