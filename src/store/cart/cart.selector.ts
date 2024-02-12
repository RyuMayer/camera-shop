import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectCartItems = (state: TState) => state[NameSpace.Cart].data;

export const selectTotalCartPrice = (state: TState) =>
  state[NameSpace.Cart].data.reduce((acc, cartItem) => {
    return acc + cartItem.count * cartItem.product.price;
  }, 0);

export const selectCartDiscount = (state: TState) =>
  state[NameSpace.Cart].discountPercent;

export const selectDiscountAmount = createSelector(
  [selectTotalCartPrice, selectCartDiscount],
  (totalPrice, discountPercent) => {
    return discountPercent
      ? Math.round((totalPrice * discountPercent) / 100)
      : discountPercent;
  },
);

export const selectCartDiscountCoupon = (state: TState) =>
  state[NameSpace.Cart].discountСoupon;

export const selectNumberItemsInCart = (state: TState) =>
  state[NameSpace.Cart].data.length;

export const selectIsCameraInCart = (state: TState, id: number) =>
  state[NameSpace.Cart].data.find(({ product }) => product.id === id);

export const selectDiscountLoadingStatus = (state: TState) =>
  state[NameSpace.Cart].discountLoadingStatus;

export const selectDiscountLoadedStatus = (state: TState) =>
  state[NameSpace.Cart].isDiscountLoaded;

export const selectCartPostingStatus = (state: TState) =>
  state[NameSpace.Cart].cartPostingStatus;

export const selectIsCartPosted = (state: TState) =>
  state[NameSpace.Cart].isCartPosted;

export const selectIsSummaryPopupOpened = (state: TState) =>
  state[NameSpace.Cart].isCartSummaryPopupOpened;
