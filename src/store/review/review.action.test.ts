import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { createApi } from '../../services/api';
import { TState } from '../../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeReviewData,
} from '../../utils/mocks';
import { APIRoute } from '../../const';
import { fetchPostReview, fetchReview } from './review.action';
import { TReviewPostData } from '../../types/review';

describe('Review async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    TState,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ REVIEW: { data: [] } });
  });

  describe('fetchReview', () => {
    it('Should dispatch "fetchReview.pending" and "fetchReview.fulfilled" with thunk "fetchReview" when server response 200', async () => {
      const mockReviewData = makeFakeReviewData();
      const cameraId = 1;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`)
        .reply(200, mockReviewData);

      await store.dispatch(fetchReview(cameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReview.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReview.pending.type,
        fetchReview.fulfilled.type,
      ]);
      expect(fetchReviewFulfilled.payload).toEqual(mockReviewData);
    });

    it('Should dispatch "fetchReview.pending" and "fetchReview.rejected" with thunk "fetchReview" when server response error (400-499)', async () => {
      const wrongCameraId = 123123123;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${wrongCameraId}${APIRoute.Reviews}`)
        .reply(400, null);

      await store.dispatch(fetchReview(wrongCameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchReview.pending.type,
        fetchReview.rejected.type,
      ]);
    });
  });

  describe('fetchPostReview', () => {
    it('Should dispatch "fetchPostReview.pending" and "fetchPostReview.fulfilled" with thunk "fetchPostReview" when server response 200', async () => {
      const fakeReviewPostData: TReviewPostData = {
        advantage: 'Тест',
        cameraId: 1,
        disadvantage: 'Тест',
        rating: 5,
        review: 'Тест',
        userName: 'Слава',
      };

      mockAxiosAdapter.onPost(APIRoute.Reviews, fakeReviewPostData).reply(200);

      await store.dispatch(fetchPostReview({ reviewData: fakeReviewPostData }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPostReview.pending.type,
        fetchPostReview.fulfilled.type,
      ]);
    });

    it('Should dispatch "fetchPostReview.pending" and "fetchPostReview.rejected" with thunk "fetchPostReview" when server response error (400-499)', async () => {
      const fakeReviewPostData: TReviewPostData = {
        advantage: 'Тест',
        cameraId: 1,
        disadvantage: 'Тест',
        rating: 5,
        review: 'Тест',
        userName: 'Слава',
      };

      mockAxiosAdapter.onPost(APIRoute.Reviews, fakeReviewPostData).reply(400);

      await store.dispatch(fetchPostReview({ reviewData: fakeReviewPostData }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPostReview.pending.type,
        fetchPostReview.rejected.type,
      ]);
    });
  });
});
