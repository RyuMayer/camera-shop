import { toast } from 'react-toastify';

import { LoadingStatus } from '../../const';
import { makeFakeReviewData } from '../../utils/mocks';
import {
  closePopup,
  dropPostedStatus,
  dropReviewData,
  openPopup,
  reviewSlice,
} from './review';
import { fetchPostReview, fetchReview } from './review.action';

describe('Review slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should drop posted status with "dropPostedStatus" action', () => {
    const initialState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: false,
    };

    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(initialState, dropPostedStatus);

    expect(result).toEqual(expectedState);
  });

  it('Should drop review data with "dropReviewData" action', () => {
    const initialState = {
      data: makeFakeReviewData(),
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: true,
    };

    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(initialState, dropReviewData);

    expect(result).toEqual(expectedState);
  });

  it('Should change popup opened status to true with "openPopup" action', () => {
    const initialState = {
      data: makeFakeReviewData(),
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: false,
    };

    const expectedState = {
      data: makeFakeReviewData(),
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: true,
    };

    const result = reviewSlice.reducer(initialState, openPopup);

    expect(result).toEqual(expectedState);
  });

  it('Should change popup opened status to false with "openPopup" action', () => {
    const initialState = {
      data: makeFakeReviewData(),
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: true,
    };

    const expectedState = {
      data: makeFakeReviewData(),
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(initialState, closePopup);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "loading", "isLoaded" to "false" with "fetchReview.pending"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Loading,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(undefined, fetchReview.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "idle", "isLoaded" to "true", "data" to review data with "fetchReview.fulfilled"', () => {
    const mockData = makeFakeReviewData();
    const expectedState = {
      data: mockData,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(
      undefined,
      fetchReview.fulfilled(mockData, '', 0),
    );

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "rejected", "isLoaded" to "false" with "fetchReview.rejected"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Rejected,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    };
    const mockToastError = vi.spyOn(toast, 'error');

    const result = reviewSlice.reducer(undefined, fetchReview.rejected);

    expect(result).toEqual(expectedState);
    expect(mockToastError).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledWith(
      'Ошибка при загрузке отзывов. Обновите страницу',
    );
  });
  // ----------------------

  it('Should set "postingStatus" to "loading", "isPosted" to "false" with "fetchPostReview.pending"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Loading,
      isPosted: false,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(undefined, fetchPostReview.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should set "postingStatus" to "idle", "isPosted" to "true" with "fetchPostReview.fulfilled"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: true,
      isPopupOpened: false,
    };

    const result = reviewSlice.reducer(undefined, fetchPostReview.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('Should set "postingStatus" to "rejected", "isPosted" to "false" with "fetchPostReview.rejected"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Rejected,
      isPosted: false,
      isPopupOpened: false,
    };
    const mockToastError = vi.spyOn(toast, 'error');

    const result = reviewSlice.reducer(undefined, fetchPostReview.rejected);

    expect(result).toEqual(expectedState);
    expect(mockToastError).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledWith(
      'Ошибка при валидации. Пожалуйста, введите валидные данные',
    );
  });
});
