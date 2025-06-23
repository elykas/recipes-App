import type { IUser } from "./userType";

export interface LoginResponse {
  success: boolean;
  message: string;
}

export type VerifyTokenResponse = {
  success: boolean;
  exist: boolean;
};

export type GetUser = {
  success: boolean;
  message: string;
  user: IUser;
};