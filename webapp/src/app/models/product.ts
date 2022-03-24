export interface ProductForList {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductForm
  extends Omit<
    Product,
    | "id"
    | "createdAt"
    | "updatedAt"
  > {
  id?: number;
}

export interface IProductFilters {
  price: {
    min: number;
    max: number;
  };
}
