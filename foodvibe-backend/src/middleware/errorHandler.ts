export const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production") {
    console.error(err.stack);
    console.error(err.message);
  }

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
    data: {}
  };

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json(response);
};
