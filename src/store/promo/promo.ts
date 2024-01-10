import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TPromo } from '../../types/promo';
import { fetchPromo } from './promo.action';

type TInitialState = {
  data: TPromo[];
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
};

const initialState: TInitialState = {
  data: [],
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      });
  },
});
