import { Role } from "./user.interface";

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface SignupResponse {
  name: string;
  email: string;
  roles: Role[];
}

export interface LoginForm {
  email: string;
  password: string;
}
