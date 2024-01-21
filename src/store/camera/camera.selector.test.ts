import { LoadingStatus, NameSpace } from '../../const';
import { makeFakeCameraData } from '../../utils/mocks';
import {
  selectCamera,
  selectLoadingStatus,
  selectLoadedStatus,
  selectCameraId,
  selectCameraName,
} from './camera.selector';

describe('Camera selectors', () => {
  const state = {
    [NameSpace.Camera]: {
      data: null,
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    },
  };

  it('Should return camera data from state', () => {
    const { data } = state[NameSpace.Camera];
    const result = selectCamera(state);

    expect(result).toBe(data);
  });

  it('Should return loading status from state', () => {
    const { loadingStatus } = state[NameSpace.Camera];
    const result = selectLoadingStatus(state);

    expect(result).toBe(loadingStatus);
  });

  it('Should return loaded status from state', () => {
    const { isLoaded } = state[NameSpace.Camera];
    const result = selectLoadedStatus(state);

    expect(result).toBe(isLoaded);
  });

  it('Should return camera id if camera data is present', () => {
    const mockData = makeFakeCameraData();
    const stateWithData = {
      [NameSpace.Camera]: {
        ...state[NameSpace.Camera],
        data: mockData,
      },
    };

    const result = selectCameraId(stateWithData);
    const expectedResult = stateWithData[NameSpace.Camera].data.id;

    expect(result).toBe(expectedResult);
  });

  it('Should return undefined id if camera data is null', () => {
    const result = selectCameraId(state);

    expect(result).toBeUndefined();
  });

  it('Should return camera name if camera data is present', () => {
    const mockData = makeFakeCameraData();
    const stateWithData = {
      [NameSpace.Camera]: {
        ...state[NameSpace.Camera],
        data: mockData,
      },
    };

    const result = selectCameraName(stateWithData);
    const expectedResult = stateWithData[NameSpace.Camera].data.name;

    expect(result).toBe(expectedResult);
  });

  it('Should return undefined name if camera data is null', () => {
    const result = selectCameraName(state);

    expect(result).toBeUndefined();
  });
});
