export interface AuthenticatedRequest extends Request {
  userId: number;
}

export interface TempTokenRequest extends Request {
  email: string;
}
