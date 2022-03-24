import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState, AppThunk } from "../../../app/store/store";
import { formatQueryParams } from "../../../app/helpers/productsHelpers";
import { IProductFilters, ProductForList } from "../../../app/models/product";
import { Products } from "./productsApi";

export interface ProductsState {
  products: ProductForList[];
  page: number;
  totalPages: number;
  filters: IProductFilters;
  loadingList: boolean;
}
export const defaultFilters = {
  price: {
    min: 0,
    max: 1000,
  },
  query: "",
};

const initialState: ProductsState = {
  products: [],
  page: 1,
  totalPages: 0,
  filters: defaultFilters,
  loadingList: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductForList[]>) => {
      state.products = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setFilters: (state, action: PayloadAction<IProductFilters>) => {
      state.filters = action.payload;
    },
    setLoadingList: (state, action: PayloadAction<boolean>) => {
      state.loadingList = action.payload;
    },
  },
});

export const {
  setProducts,
  setPage,
  setTotalPages,
  setFilters,
  setLoadingList,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export const selectPage = (state: RootState) => state.products.page;

export const selectTotalPages = (state: RootState) => state.products.totalPages;

export const selectFilters = (state: RootState) => state.products.filters;
export const selectLoadingList = (state: RootState) =>
  state.products.loadingList;

export const fetchProducts = (): AppThunk => (dispatch, getState) => {
  const filters = getState().products.filters;
  const page = getState().products.page;
  const pageSize = 10;
  dispatch(setLoadingList(true));
  Products.list(
    formatQueryParams(filters, defaultFilters, pageSize, page)
  ).then((res: any) => {
    dispatch(setProducts(res.data));
    dispatch(setTotalPages(res.pages));
    dispatch(setLoadingList(false));
  });
};

export const resetProductsState = (): AppThunk => (dispatch, getState) => {
  dispatch(setProducts([]));
  dispatch(setTotalPages(0));
  dispatch(setLoadingList(false));
  dispatch(setFilters(defaultFilters));
  dispatch(setPage(1));
};

export default productsSlice.reducer;
