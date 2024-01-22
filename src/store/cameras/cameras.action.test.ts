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
import { fetchCameras } from './cameras.action';

describe('Cameras async actions', () => {
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
    store = mockStoreCreator({ CAMERAS: { data: [] } });
  });

  describe('fetchCameras', () => {
    it('Should dispatch "fetchCameras.pending" and "fetchCameras.fulfilled" with thunk "fetchCameras" when server response 200', async () => {
      const mockCameraData = [makeFakeCameraData()];
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameraData);

      await store.dispatch(fetchCameras());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCameraFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCameras.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchCameras.pending.type,
        fetchCameras.fulfilled.type,
      ]);
      expect(fetchCameraFulfilled.payload).toEqual(mockCameraData);
    });

    it('Should dispatch "fetchCamera.pending" and "fetchCamera.rejected" with thunk "fetchCamera" when server response error (400-499)', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, null);

      await store.dispatch(fetchCameras());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCameras.pending.type,
        fetchCameras.rejected.type,
      ]);
    });
  });
});
