import rateLimit from "express-rate-limit";

export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

