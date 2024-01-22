import { toast } from 'react-toastify';

import { LoadingStatus } from '../../const';
import { makeFakeCameraData } from '../../utils/mocks';
import { camerasSlice, dropCamerasData } from './cameras';
import { fetchCameras } from './cameras.action';

describe('Cameras slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = camerasSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = camerasSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should drop camera data with "dropCamerasData" action', () => {
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

    const result = camerasSlice.reducer(initialState, dropCamerasData);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "loading", "isLoaded" to "false" with "fetchCameras.pending"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Loading,
      isLoaded: false,
    };

    const result = camerasSlice.reducer(undefined, fetchCameras.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "idle", "isLoaded" to "true", "data" to camera data with "fetchCameras.fulfilled"', () => {
    const mockData = makeFakeCameraData();
    const expectedState = {
      data: [mockData],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const result = camerasSlice.reducer(
      undefined,
      fetchCameras.fulfilled([mockData], '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "rejected", "isLoaded" to "false" with "fetchCameras.rejected"', () => {
    const expectedState = {
      data: [],
      loadingStatus: LoadingStatus.Rejected,
      isLoaded: false,
    };
    const mockToastError = vi.spyOn(toast, 'error');

    const result = camerasSlice.reducer(undefined, fetchCameras.rejected);

    expect(result).toEqual(expectedState);
    expect(mockToastError).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledWith(
      'Ошибка при загрузке товаров. Обновите страницу',
    );
  });
});
