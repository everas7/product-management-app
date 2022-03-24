export const PRODUCT_CREATORS = "PRODUCT_CREATORS";
export const PRODUCT_MANAGERS = "PRODUCT_MANAGERS";
export const PRODUCT_PRICING = "PRODUCT_PRICING";
export type Role =
  | typeof PRODUCT_CREATORS
  | typeof PRODUCT_MANAGERS
  | typeof PRODUCT_PRICING;

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: Role[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserForm
  extends Omit<User, "id" | "createdAt" | "updatedAt" | "password"> {
  id?: number;
  password?: string;
}
