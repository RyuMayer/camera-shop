import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TReview } from '../../types/review';
import { fetchPostReview, fetchReview } from './review.action';
import { toast } from 'react-toastify';

type TInitialState = {
  data: TReview[];
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
  postingStatus: TLoadingStatus;
  isPosted: boolean;
  isPopupOpened: boolean;
};

const initialState: TInitialState = {
  data: [],
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
  postingStatus: LoadingStatus.Idle,
  isPosted: false,
  isPopupOpened: false,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    dropPostedStatus(state) {
      state.isPosted = false;
    },
    dropReviewData(state) {
      state.data = [];
      state.loadingStatus = LoadingStatus.Idle;
      state.isLoaded = false;
      state.postingStatus = LoadingStatus.Idle;
      state.isPosted = false;
      state.isPopupOpened = false;
    },
    openPopup(state) {
      state.isPopupOpened = true;
    },
    closePopup(state) {
      state.isPopupOpened = false;
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
      .addCase(fetchReview.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
        state.isLoaded = false;
        toast.error('Ошибка при загрузке отзывов. Обновите страницу');
      })
      .addCase(fetchPostReview.pending, (state) => {
        state.postingStatus = LoadingStatus.Loading;
        state.isPosted = false;
      })
      .addCase(fetchPostReview.fulfilled, (state) => {
        state.postingStatus = LoadingStatus.Idle;
        state.isPosted = true;
      })
      .addCase(fetchPostReview.rejected, (state) => {
        state.postingStatus = LoadingStatus.Rejected;
        state.isPosted = false;
        toast.error(
          'Ошибка при валидации. Пожалуйста, введите валидные данные',
        );
      });
  },
});

export const { dropPostedStatus, dropReviewData, closePopup, openPopup } =
  reviewSlice.actions;
