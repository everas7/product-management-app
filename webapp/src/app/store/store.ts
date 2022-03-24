import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accessReducer from '../../features/access/services/accessSlice';
import productsReducer from '../../features/products/services/productsSlice';

export const store = configureStore({
  reducer: {
    access: accessReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
