import { Product, ProductDto } from "../interfaces/product.interface";

export const toProductDto = (product: Product): ProductDto => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
