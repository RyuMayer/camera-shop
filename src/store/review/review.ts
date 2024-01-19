import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TReview } from '../../types/review';
import { fetchReview } from './review.action';

type TInitialState = {
  data: TReview[];
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
};

const initialState: TInitialState = {
  data: [],
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      });
  },
});
