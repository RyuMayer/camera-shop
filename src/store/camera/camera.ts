import { createSlice } from '@reduxjs/toolkit';

import { TCamera } from '../../types/camera';
import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { fetchCamera } from './camera.action';

type TInitialState = {
  data: TCamera | null;
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
};

const initialState: TInitialState = {
  data: null,
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
};

export const cameraSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamera.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchCamera.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      });
  },
});
