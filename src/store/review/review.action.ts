import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, NameSpace } from '../../const';
import { TReview } from '../../types/review';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchReview = createAsyncThunk<TReview[], string, TExtra>(
  `${NameSpace.Review}/fetchReview`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TReview[]>(
      `${APIRoute.Cameras}/${id}/reviews`,
    );
    return data;
  },
);
