import { createSlice } from '@reduxjs/toolkit';

import { TCamera } from '../../types/camera';
import { NameSpace } from '../../const';
import { fetchCameras } from './cameras.action';

type TInitialState = {
  data: TCamera[];
};

const initialState: TInitialState = {
  data: [],
};

export const camerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    //TODO: Доделать нормальную загрузку!
    builder.addCase(fetchCameras.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
