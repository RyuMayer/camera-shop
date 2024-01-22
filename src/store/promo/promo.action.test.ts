import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { createApi } from '../../services/api';
import { TState } from '../../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakePromoData,
} from '../../utils/mocks';
import { APIRoute } from '../../const';
import { fetchPromo } from './promo.action';

describe('Promo async actions', () => {
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
    store = mockStoreCreator({ PROMO: { data: [] } });
  });

  describe('fetchPromo', () => {
    it('Should dispatch "fetchPromo.pending" and "fetchPromo.fulfilled" with thunk "fetchPromo" when server response 200', async () => {
      const mockPromoData = [makeFakePromoData()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoData);

      await store.dispatch(fetchPromo());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCameraFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromo.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromo.pending.type,
        fetchPromo.fulfilled.type,
      ]);
      expect(fetchCameraFulfilled.payload).toEqual(mockPromoData);
    });

    it('Should dispatch "fetchPromo.pending" and "fetchPromo.rejected" with thunk "fetchPromo" when server response error (400-499)', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, null);

      await store.dispatch(fetchPromo());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPromo.pending.type,
        fetchPromo.rejected.type,
      ]);
    });
  });
});
