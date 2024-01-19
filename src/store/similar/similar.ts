import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TCamera } from '../../types/camera';
import { fetchSimilar } from './similar.action';

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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilar.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      });
  },
});
