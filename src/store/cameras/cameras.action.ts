import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { TCamera } from '../../types/camera';
import { APIRoute, NameSpace } from '../../const';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchCameras = createAsyncThunk<TCamera[], undefined, TExtra>(
  `${NameSpace.Cameras}/fetchCameras`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TCamera[]>(APIRoute.Cameras);
    return data;
  },
);
