import { Request } from "express";


export interface AuthenticatedRequest extends Request {
  publicId: string;
  email?: string;
}



export type SupabaseJwtPayload = {
  sub: string;          
  email: string;        
};


