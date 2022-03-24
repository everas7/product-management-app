import { Request } from "express";
import { Product } from "../interfaces/product.interface";

declare global {
  namespace Express {
    export interface Request {
      product?: Product;
    }
  }
}
