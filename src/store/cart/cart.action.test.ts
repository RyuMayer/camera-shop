import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { createApi } from '../../services/api';
import { TState } from '../../types/state';
import { AppThunkDispatch, extractActionsTypes } from '../../utils/mocks';
import { APIRoute } from '../../const';
import { fetchPostCart, fetchPostDiscount } from './cart.action';
import { TCartData } from '../../types/cart';

describe('Cart async actions', () => {
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

  describe('fetchPostDiscount', () => {
    it('Should dispatch "fetchPostDiscount.pending" and "fetchPostDiscount.fulfilled" with thunk "fetchPostDiscount" when server response 200', async () => {
      const coupon = 'camera-333';
      const discountPercent = 15;

      mockAxiosAdapter.onPost(APIRoute.Discount).reply(200, discountPercent);

      await store.dispatch(fetchPostDiscount(coupon));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPostDiscountFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPostDiscount.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPostDiscount.pending.type,
        fetchPostDiscount.fulfilled.type,
      ]);
      expect(fetchPostDiscountFulfilled.payload).toEqual({
        data: discountPercent,
        coupon,
      });
    });

    it('Should dispatch "fetchPostDiscount.pending" and "fetchPostDiscount.rejected" with thunk "fetchPostDiscount" when server response error (400-499)', async () => {
      const wrongCoupon = 'asdasd';
      mockAxiosAdapter.onPost(APIRoute.Discount).reply(400, null);

      await store.dispatch(fetchPostDiscount(wrongCoupon));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPostDiscount.pending.type,
        fetchPostDiscount.rejected.type,
      ]);
    });
  });
  describe('fetchPostCart', () => {
    it('Should dispatch "fetchPostCart.pending" and "fetchPostCart.fulfilled" with thunk "fetchPostCart" when server response 200', async () => {
      const mockData: TCartData = {
        camerasIds: [1, 2, 3],
        coupon: 'camera-333',
      };

      mockAxiosAdapter.onPost(APIRoute.Orders).reply(200, mockData);

      await store.dispatch(fetchPostCart(mockData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPostCart.pending.type,
        fetchPostCart.fulfilled.type,
      ]);
    });

    it('Should dispatch "fetchPostCart.pending" and "fetchPostCart.rejected" with thunk "fetchPostCart" when server response error (400-499)', async () => {
      const mockData: TCartData = {
        camerasIds: [1, 2, 3],
        coupon: 'camera-333 33  3 3 3 3',
      };

      mockAxiosAdapter.onPost(APIRoute.Orders).reply(400, null);

      await store.dispatch(fetchPostCart(mockData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPostCart.pending.type,
        fetchPostCart.rejected.type,
      ]);
    });
  });
});
