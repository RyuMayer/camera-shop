import { createSlice } from '@reduxjs/toolkit';

import { TCamera } from '../../types/camera';
import { LoadingStatus, NameSpace } from '../../const';
import { fetchCameras } from './cameras.action';
import { TLoadingStatus } from '../../types/state';

type TInitialState = {
  data: TCamera[];
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
};

const initialState: TInitialState = {
  data: [],
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
};

export const camerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      });
  },
});
