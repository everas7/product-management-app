import {
  Product,
  ProductForm,
  ProductFilters,
} from "../interfaces/product.interface";
import * as productRepository from "../repositories/product.repository";
import { User } from "../interfaces/user.interface";
import { Op } from "sequelize";
import { Pagination, PaginatedResult } from "../interfaces/custom.interface";

export const getAll = async (
  user: User,
  filters: ProductFilters,
  pagination: Pagination
): Promise<PaginatedResult<Product>> => {
  const where = {
    ...(filters.minPrice || filters.maxPrice
      ? {
          price: {
            ...(filters.minPrice ? { [Op.gte]: filters.minPrice } : {}),
            ...(filters.maxPrice ? { [Op.lte]: filters.maxPrice } : {}),
          },
        }
      : {}),
    [Op.or]: [
      { title: { [Op.like]: `%${filters.query || ""}%` } },
      { description: { [Op.like]: `%${filters.query || ""}%` } },
    ],
  };

  return productRepository.findAllWhere(where, pagination);
};

export const add = async (product: ProductForm): Promise<Product> => {
  return productRepository.create(product);
};

export const update = async (
  id: number,
  product: ProductForm
): Promise<Product> => {
  return productRepository.update(id, product);
};

export const getById = async (id: number): Promise<Product | undefined> => {
  return productRepository.findById(id);
};

export const remove = async (id: number): Promise<number> => {
  return productRepository.remove(id);
};
