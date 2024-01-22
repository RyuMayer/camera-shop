import { toast } from 'react-toastify';

import { LoadingStatus } from '../../const';
import { dropSimilarData, similarSlice } from './similar';
import { makeFakeCameraData } from '../../utils/mocks';
import { fetchSimilar } from './similar.action';

describe('Similar slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = similarSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = similarSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should drop similar data with "dropSimilarData" action', () => {
    const initialState = {
      data: [makeFakeCameraData()],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = similarSlice.reducer(initialState, dropSimilarData);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "loading", "isLoaded" to "false" with "fetchSimilar.pending"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Loading,
      isLoaded: false,
    };

    const result = similarSlice.reducer(undefined, fetchSimilar.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "idle", "isLoaded" to "true", "data" to similar data with "fetchSimilar.fulfilled"', () => {
    const mockData = [makeFakeCameraData()];
    const expectedState = {
      data: mockData,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const result = similarSlice.reducer(
      undefined,
      fetchSimilar.fulfilled(mockData, '', 0),
    );

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "rejected", "isLoaded" to "false" with "fetchSimilar.rejected"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Rejected,
      isLoaded: false,
    };
    const mockToastError = vi.spyOn(toast, 'error');

    const result = similarSlice.reducer(undefined, fetchSimilar.rejected);

    expect(result).toEqual(expectedState);
    expect(mockToastError).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledWith(
      'Ошибка при загрузке похожих товаров. Пожалуйста, обновите сраницу',
    );
  });
});
