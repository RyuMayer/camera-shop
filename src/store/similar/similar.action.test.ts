import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { createApi } from '../../services/api';
import { TState } from '../../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeCameraData,
} from '../../utils/mocks';
import { APIRoute } from '../../const';
import { fetchSimilar } from './similar.action';

describe('Camera async actions', () => {
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
    store = mockStoreCreator({ SIMILAR: { data: [] } });
  });

  describe('fetchSimilar', () => {
    it('Should dispatch "fetchSimilar.pending" and "fetchSimilar.fulfilled" with thunk "fetchSimilar" when server response 200', async () => {
      const mockCameraData = [makeFakeCameraData()];
      const cameraId = 1;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${cameraId}/similar`)
        .reply(200, mockCameraData);

      await store.dispatch(fetchSimilar(cameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilar.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchSimilar.pending.type,
        fetchSimilar.fulfilled.type,
      ]);
      expect(fetchSimilarFulfilled.payload).toEqual(mockCameraData);
    });

    it('Should dispatch "fetchSimilar.pending" and "fetchSimilar.rejected" with thunk "fetchSimilar" when server response error (400-499)', async () => {
      const wrongCameraId = 123123123;
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${wrongCameraId}/similar`)
        .reply(400, null);

      await store.dispatch(fetchSimilar(wrongCameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchSimilar.pending.type,
        fetchSimilar.rejected.type,
      ]);
    });
  });
});
