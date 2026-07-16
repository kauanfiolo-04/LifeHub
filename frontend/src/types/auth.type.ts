import { User } from "./common";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
}; 

export type SignUpResponse = {
  accessToken: string;
  user: User;
};

export type LogoutResponse = {
  success: boolean;
}

export type RefreshResponse = {
  accessToken: string;
};

export type MeResponse = User;