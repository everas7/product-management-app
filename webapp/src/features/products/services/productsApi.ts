import { request } from "../../../app/services/axios";
import {
  Product,
  ProductForList,
  IProductForm,
} from "../../../app/models/product";
import { Paginated } from "../../../app/models/custom";

export const Products = {
  list: (params?: URLSearchParams): Promise<Paginated<ProductForList>> =>
    request.getPaginated("products", params),
  get: (id: number): Promise<Product> => request.get(`products/${id}`),
  update: (id: number, product: IProductForm): Promise<Product> =>
    request.put(`products/${id}`, product),
  create: (product: IProductForm): Promise<Product> =>
    request.post(`products`, product),
  uploadPhotos: (id: number, photos: FormData): Promise<Product> =>
    request.postForm(`products/${id}/photos`, photos),
  delete: (id: number): Promise<number> => request.del(`products/${id}`),
  deletePhotos: (id: number, params: URLSearchParams): Promise<number> =>
    request.del(`products/${id}/photos`, params),
};
