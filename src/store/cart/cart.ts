import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TCartItem, TCartStorageData } from '../../types/cart';
import { TCamera } from '../../types/camera';
import { getStorage } from '../../services/storage';
import { fetchPostCart, fetchPostDiscount } from './cart.action';
import { TLoadingStatus } from '../../types/state';

type TInitialState = {
  data: TCartItem[];
  cartPostingStatus: TLoadingStatus;
  isCartPosted: boolean;

  discountPercent: number;
  discountСoupon: string | null;
  discountLoadingStatus: TLoadingStatus;
  isDiscountLoaded: boolean;
  isCartSummaryPopupOpened: boolean;
};

//FIXME: Перенести в константу
const cartStorage = getStorage<TCartStorageData>('cart');

const initialState: TInitialState = {
  data: cartStorage?.items ? cartStorage.items : [],
  discountPercent: cartStorage?.discountPercent
    ? cartStorage.discountPercent
    : 0,
  discountСoupon: null,
  discountLoadingStatus: LoadingStatus.Idle,
  isDiscountLoaded: false,
  cartPostingStatus: LoadingStatus.Idle,
  isCartPosted: false,
  isCartSummaryPopupOpened: false,
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

      state.data = state.data.map((cartItem) => {
        if (cartItem.product.id === product.id) {
          //FIXME: В константу!
          if (cartItem.count < 99) {
            cartItem.count += 1;
          }
        }

        return cartItem;
      });
    },

    removeFromCart(state, action: PayloadAction<{ product: TCamera }>) {
      const { product } = action.payload;

      state.data = state.data.map((cartItem) => {
        if (product.id === cartItem.product.id) {
          //FIXME: В константу!
          if (cartItem.count > 1) {
            cartItem.count -= 1;
          }
        }

        return cartItem;
      });
    },

    deleteFromCart(state, action: PayloadAction<{ product: TCamera }>) {
      const { product } = action.payload;

      state.data = state.data.filter(
        (cartItem) => cartItem.product.id !== product.id,
      );
    },

    changeItemNumberInCart(
      state,
      action: PayloadAction<{ product: TCamera; count: number }>,
    ) {
      const { product, count } = action.payload;

      if (count >= 1 && count <= 99) {
        state.data = state.data.map((cartItem) => {
          if (product.id === cartItem.product.id) {
            //FIXME: В константу!
            cartItem.count = count;
          }

          return cartItem;
        });
      }
    },

    dropDiscountLoadingStatus(state) {
      state.discountLoadingStatus = LoadingStatus.Idle;
      state.isDiscountLoaded = false;
    },

    openSummaryPopup(state) {
      state.isCartSummaryPopupOpened = true;
    },

    closeSummaryPopup(state) {
      state.isCartSummaryPopupOpened = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostDiscount.pending, (state) => {
        state.discountLoadingStatus = LoadingStatus.Loading;
        state.isDiscountLoaded = false;
      })
      .addCase(fetchPostDiscount.fulfilled, (state, action) => {
        const { coupon, data } = action.payload;
        state.discountPercent = data;
        state.discountСoupon = coupon;
        state.discountLoadingStatus = LoadingStatus.Idle;
        state.isDiscountLoaded = true;
      })
      .addCase(fetchPostDiscount.rejected, (state) => {
        state.discountPercent = 0;
        state.discountСoupon = null;
        state.discountLoadingStatus = LoadingStatus.Rejected;
        state.isDiscountLoaded = false;
      })
      .addCase(fetchPostCart.pending, (state) => {
        state.cartPostingStatus = LoadingStatus.Loading;
        state.isCartPosted = false;
      })
      .addCase(fetchPostCart.fulfilled, (state) => {
        state.cartPostingStatus = LoadingStatus.Idle;
        state.isCartPosted = true;
        state.data = [];
        state.discountPercent = 0;
        state.discountСoupon = null;
        state.discountLoadingStatus = LoadingStatus.Idle;
        state.isDiscountLoaded = false;
      })
      .addCase(fetchPostCart.rejected, (state) => {
        state.cartPostingStatus = LoadingStatus.Rejected;
        state.isCartPosted = false;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  changeItemNumberInCart,
  dropDiscountLoadingStatus,
  closeSummaryPopup,
  openSummaryPopup,
} = cartSlice.actions;
