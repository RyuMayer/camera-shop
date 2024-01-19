import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { TCamera } from '../../types/camera';
import { APIRoute, NameSpace } from '../../const';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchSimilar = createAsyncThunk<TCamera[], TCamera['id'], TExtra>(
  `${NameSpace.Similar}/fetchSimilar`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TCamera[]>(
      `${APIRoute.Cameras}/${id}/similar`,
    );
    return data;
  },
);
