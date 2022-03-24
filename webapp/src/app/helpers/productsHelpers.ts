import { IProductFilters } from "../models/product";


export const formatQueryParams = (
  filters: IProductFilters,
  defaultFilters: IProductFilters,
  pageSize: number,
  nextPage: number
) => {
  const params = new URLSearchParams();
  params.append("filters[minPrice]", String(filters.price.min));
  if (filters.price!.max !== defaultFilters.price.max) {
    params.append("filters[maxPrice]", String(filters.price.max));
  }
  if (filters.query) {
    params.append("filters[query]", String(filters.query));
  }
  params.append("page", String(nextPage));
  params.append("pageSize", String(pageSize));
  return params;
};
