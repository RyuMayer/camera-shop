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
import { fetchCamera } from './camera.action';

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
    store = mockStoreCreator({ CAMERA: { data: null } });
  });

  describe('fetchCamera', () => {
    it('should dispatch "fetchCamera.pending" and "fetchCamera.fulfilled" with thunk "fetchCamera" when server response 200', async () => {
      const mockCameraData = makeFakeCameraData();
      const cameraId = '1';
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${cameraId}`)
        .reply(200, mockCameraData);

      await store.dispatch(fetchCamera(cameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCameraFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCamera.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchCamera.pending.type,
        fetchCamera.fulfilled.type,
      ]);
      expect(fetchCameraFulfilled.payload).toEqual(mockCameraData);
    });

    it('should dispatch "fetchCamera.pending" and "fetchCamera.rejected" with thunk "fetchCamera" when server response error (400-499)', async () => {
      const wrongCameraId = 'wrong id';
      mockAxiosAdapter
        .onGet(`${APIRoute.Cameras}/${wrongCameraId}`)
        .reply(400, null);

      await store.dispatch(fetchCamera(wrongCameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCamera.pending.type,
        fetchCamera.rejected.type,
      ]);
    });
  });
});
