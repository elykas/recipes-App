import type { IUser } from "./userModel";

export interface LoginResponse {
  success: boolean;
  message: string;
}


export type VerifyTokenResponse =
  | { success: true; exist: true; data: IUser }
  | { success: true; exist: false; data: { email: string } };

export interface RegisterResponse {
  success: boolean;
  data: IUser;
}
