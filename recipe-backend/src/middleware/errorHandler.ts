export const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (process.env.NODE_ENV === "test") {
    console.error(err.stack);
  }

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
    data: {}
  };

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json(response);
};
