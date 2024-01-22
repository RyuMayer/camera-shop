import { createSlice } from '@reduxjs/toolkit';

import { TCamera } from '../../types/camera';
import { LoadingStatus, NameSpace } from '../../const';
import { fetchCameras } from './cameras.action';
import { TLoadingStatus } from '../../types/state';
import { toast } from 'react-toastify';

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
  reducers: {
    dropCamerasData(state) {
      state.data = [];
      state.isLoaded = false;
      state.loadingStatus = LoadingStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.isLoaded = false;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
        state.isLoaded = false;
        toast.error('Ошибка при загрузке товаров. Обновите страницу');
      });
  },
});

export const { dropCamerasData } = camerasSlice.actions;
