import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { TCartItem } from '../../types/cart';
import { TCamera } from '../../types/camera';

type TInitialState = {
  data: TCartItem[];
};

const initialState: TInitialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: TCamera }>) {
      const { product } = action.payload;

      const isProductExist = state.data.find(
        (cartItem) => cartItem.product.id === product.id,
      );

      if (!isProductExist) {
        state.data.push({
          product,
          count: 1,
        });

        return;
      }

      state.data.map((cartItem) => {
        if (cartItem.product.id === product.id) {
          cartItem.count += 1;
        }

        return cartItem;
      });
    },
  },
});

export const { addToCart } = cartSlice.actions;
