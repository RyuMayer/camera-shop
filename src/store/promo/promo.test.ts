import { toast } from 'react-toastify';

import { LoadingStatus } from '../../const';
import { makeFakePromoData } from '../../utils/mocks';
import { dropPromoData, promoSlice } from './promo';
import { fetchPromo } from './promo.action';

describe('Promo slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = promoSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = promoSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should drop camera data with "dropCameraData" action', () => {
    const initialState = {
      data: [makeFakePromoData()],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = promoSlice.reducer(initialState, dropPromoData);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "loading", "isLoaded" to "false" with "fetchPromo.pending"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Loading,
      isLoaded: false,
    };

    const result = promoSlice.reducer(undefined, fetchPromo.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "idle", "isLoaded" to "true", "data" to camera data with "fetchPromo.fulfilled"', () => {
    const mockData = [makeFakePromoData()];
    const expectedState = {
      data: mockData,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const result = promoSlice.reducer(
      undefined,
      fetchPromo.fulfilled(mockData, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "rejected", "isLoaded" to "false" with "fetchPromo.rejected"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Rejected,
      isLoaded: false,
    };
    const mockToastError = vi.spyOn(toast, 'error');

    const result = promoSlice.reducer(undefined, fetchPromo.rejected);

    expect(result).toEqual(expectedState);
    expect(mockToastError).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledWith(
      'Ошибка при загрузке промо товаров. Обновите страницу',
    );
  });
});
