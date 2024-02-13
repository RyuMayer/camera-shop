import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../services/api';
import { rootReducer } from './root-reducer';
import { saveStorage } from '../services/storage';
import { TCartStorageData } from '../types/cart';
import { CART_STORAGE_KEY } from './cart/cart.const';

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.subscribe(() => {
  saveStorage<TCartStorageData>(
    {
      items: store.getState().CART.data,
      discountPercent: store.getState().CART.discountPercent,
      coupon: store.getState().CART.discountСoupon,
    },
    CART_STORAGE_KEY,
  );
});
