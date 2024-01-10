import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, NameSpace } from '../../const';
import { TPromo } from '../../types/promo';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchPromo = createAsyncThunk<TPromo[], undefined, TExtra>(
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPromo[]>(APIRoute.Promo);
    return data;
  },
);
