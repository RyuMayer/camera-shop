import { toast } from 'react-toastify';

import { LoadingStatus } from '../../const';
import { makeFakeCameraData } from '../../utils/mocks';
import { cameraSlice, dropCameraData } from './camera';
import { fetchCamera } from './camera.action';

describe('Camera slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: null,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = cameraSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: null,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = cameraSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should drop camera data with "dropCameraData" action', () => {
    const initialState = {
      data: makeFakeCameraData(),
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const expectedState = {
      data: null,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    };

    const result = cameraSlice.reducer(initialState, dropCameraData);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "loading", "isLoaded" to "false" with "fetchCamera.pending"', () => {
    const expectedState = {
      data: null,
      loadingStatus: LoadingStatus.Loading,
      isLoaded: false,
    };

    const result = cameraSlice.reducer(undefined, fetchCamera.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "idle", "isLoaded" to "true", "data" to camera data with "fetchCamera.fulfilled"', () => {
    const mockData = makeFakeCameraData();
    const expectedState = {
      data: mockData,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: true,
    };

    const result = cameraSlice.reducer(
      undefined,
      fetchCamera.fulfilled(mockData, '', ''),
    );

    expect(result).toEqual(expectedState);
  });

  it('Should set "loadingStatus" to "rejected", "isLoaded" to "false" with "fetchCamera.rejected"', () => {
    const expectedState = {
      data: null,
      loadingStatus: LoadingStatus.Rejected,
      isLoaded: false,
    };
    const mockToastError = vi.spyOn(toast, 'error');

    const result = cameraSlice.reducer(undefined, fetchCamera.rejected);

    expect(result).toEqual(expectedState);
    expect(mockToastError).toHaveBeenCalledTimes(1);
    expect(mockToastError).toHaveBeenCalledWith(
      'Ошибка при загрузке товара. Обновите страницу',
    );
  });
});
