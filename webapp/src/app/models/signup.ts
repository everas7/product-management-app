import { Role } from "./user";

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface SignupResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
