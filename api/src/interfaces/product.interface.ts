export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDto extends Product {}

export type ProductForm = Omit<Product, "id" | "createdAt" | "updatedAt">;

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}
