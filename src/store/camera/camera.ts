import { createSlice } from '@reduxjs/toolkit';

import { TCamera } from '../../types/camera';
import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { fetchCamera } from './camera.action';
import { toast } from 'react-toastify';

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
  reducers: {
    dropCameraData(state) {
      state.data = null;
      state.isLoaded = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamera.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.isLoaded = false;
      })
      .addCase(fetchCamera.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      })
      .addCase(fetchCamera.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
        state.isLoaded = false;
        toast.error('Ошибка при загрузке товара. Обновите страницу');
      });
  },
});

export const { dropCameraData } = cameraSlice.actions;
