import { Request } from "express";


export interface AuthenticatedRequest extends Request {
  publicId: string;
}




