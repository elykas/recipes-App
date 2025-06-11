import type { IUser } from "./userModel";

export interface LoginResponse {
  success: boolean;
  message: string;
}


export interface VerifyTokenResponse {
  success: boolean;
  exist: boolean;
  data: IUser | { email: string }; // Or a more complete decoded shape
}
