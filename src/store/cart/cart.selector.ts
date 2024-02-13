import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { TState } from '../../types/state';

type TCartState = Pick<TState, typeof NameSpace.Cart>;

export const selectCartItems = (state: TCartState) =>
  state[NameSpace.Cart].data;

export const selectTotalCartPrice = (state: TCartState) =>
  state[NameSpace.Cart].data.reduce((acc, cartItem) => {
    return acc + cartItem.count * cartItem.product.price;
  }, 0);

export const selectCartDiscount = (state: TCartState) =>
  state[NameSpace.Cart].discountPercent;

export const selectDiscountAmount = createSelector(
  [selectTotalCartPrice, selectCartDiscount],
  (totalPrice, discountPercent) => {
    return discountPercent
      ? Math.round((totalPrice * discountPercent) / 100)
      : discountPercent;
  },
);

export const selectCartDiscountCoupon = (state: TCartState) =>
  state[NameSpace.Cart].discountСoupon;

export const selectNumberItemsInCart = (state: TCartState) =>
  state[NameSpace.Cart].data.reduce((acc, cartItem) => {
    return acc + cartItem.count;
  }, 0);

export const selectIsCameraInCart = (state: TCartState, id: number) =>
  state[NameSpace.Cart].data.find(({ product }) => product.id === id);

export const selectDiscountLoadingStatus = (state: TCartState) =>
  state[NameSpace.Cart].discountLoadingStatus;

export const selectDiscountLoadedStatus = (state: TCartState) =>
  state[NameSpace.Cart].isDiscountLoaded;

export const selectCartPostingStatus = (state: TCartState) =>
  state[NameSpace.Cart].cartPostingStatus;

export const selectIsCartPosted = (state: TCartState) =>
  state[NameSpace.Cart].isCartPosted;

export const selectIsSummaryPopupOpened = (state: TCartState) =>
  state[NameSpace.Cart].isCartSummaryPopupOpened;

export const selectDiscountCoupon = (state: TCartState) =>
  state[NameSpace.Cart].discountСoupon;
