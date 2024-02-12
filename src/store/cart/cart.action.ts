import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, NameSpace } from '../../const';
import { TCartData } from '../../types/cart';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchPostDiscount = createAsyncThunk<
  { data: number; coupon: string },
  string,
  TExtra
>(`${NameSpace.Cart}/fetchPostDiscount`, async (coupon, { extra: api }) => {
  const { data } = await api.post<number>(APIRoute.Discount, { coupon });
  return { coupon, data };
});

export const fetchPostCart = createAsyncThunk<void, TCartData, TExtra>(
  `${NameSpace.Cart}/fetchPostCart`,
  async (cartData, { extra: api }) => {
    await api.post(APIRoute.Orders, cartData);
  },
);
