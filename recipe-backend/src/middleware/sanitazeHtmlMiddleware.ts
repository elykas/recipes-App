import sanitizeHtml from "sanitize-html";
import { Request, Response, NextFunction } from "express";

const sanitizeValue = (value: any): any => {
  if (typeof value === "string") {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, sanitizeValue(val)])
    );
  }
  return value;
};

export const sanitizeBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      req.body[key] = sanitizeValue(req.body[key]);
    });
  }
  next();
};

export const sanitizeQueryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      req.query[key] = sanitizeValue(req.query[key]);
    });
  }
  next();
};

export const sanitizeParamsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.params) {
    Object.keys(req.params).forEach(key => {
      req.params[key] = sanitizeValue(req.params[key]);
    });
  }
  next();
};
