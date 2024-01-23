import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { TState } from '../types/state';
import { createApi } from '../services/api';
import { AppThunkDispatch } from './mocks';

type TComponentWithMockStore = {
  withStoreComponent: ReactElement;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withRouter(component: ReactElement) {
  return <BrowserRouter>{component}</BrowserRouter>;
}

export function withStore(
  component: ReactElement,
  initialState: Partial<TState> = {},
): TComponentWithMockStore {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    TState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
