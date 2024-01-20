import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TReview } from '../../types/review';
import { fetchPostReview, fetchReview } from './review.action';

type TInitialState = {
  data: TReview[];
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
  postingStatus: TLoadingStatus;
  isPosted: boolean;
};

const initialState: TInitialState = {
  data: [],
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
  postingStatus: LoadingStatus.Idle,
  isPosted: false,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    dropPostedStatus(state) {
      state.isPosted = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.isLoaded = false;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      })
      .addCase(fetchPostReview.pending, (state) => {
        state.postingStatus = LoadingStatus.Loading;
        state.isPosted = false;
      })
      .addCase(fetchPostReview.fulfilled, (state) => {
        state.postingStatus = LoadingStatus.Idle;
        state.isPosted = true;
      });
  },
});

export const { dropPostedStatus } = reviewSlice.actions;
