import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { TCamera } from '../../types/camera';
import { APIRoute, NameSpace } from '../../const';

type TExtra = {
  extra: AxiosInstance;
};

export const fetchCamera = createAsyncThunk<TCamera, TCamera['id'], TExtra>(
  `${NameSpace.Camera}/fetchCamera`,
  async (id, { extra: api }) => {
    const { data } = await api.get<TCamera>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);
