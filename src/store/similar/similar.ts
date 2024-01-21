import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TCamera } from '../../types/camera';
import { fetchSimilar } from './similar.action';
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

export const similarSlice = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {
    dropSimilarData(state) {
      state.data = [];
      state.isLoaded = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSimilar.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.isLoaded = false;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      })
      .addCase(fetchSimilar.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
        state.isLoaded = false;
        toast.error(
          'Ошибка при загрузке похожих товаров. Пожалуйста, обновите сраницу',
        );
      });
  },
});

export const { dropSimilarData } = similarSlice.actions;
