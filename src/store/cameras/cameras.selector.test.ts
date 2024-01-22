import { LoadingStatus, NameSpace } from '../../const';
import { makeFakeCameraData } from '../../utils/mocks';

import {
  selectCameras,
  selectLoadedStatus,
  selectLoadingStatus,
} from './cameras.selector';

describe('Cameras selectors', () => {
  const state = {
    [NameSpace.Cameras]: {
      data: [makeFakeCameraData()],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    },
  };

  it('Should return cameras data from state', () => {
    const { data } = state[NameSpace.Cameras];
    const result = selectCameras(state);

    expect(result).toBe(data);
  });

  it('Should return loading status from state', () => {
    const { loadingStatus } = state[NameSpace.Cameras];
    const result = selectLoadingStatus(state);

    expect(result).toBe(loadingStatus);
  });

  it('Should return loaded status from state', () => {
    const { isLoaded } = state[NameSpace.Cameras];
    const result = selectLoadedStatus(state);

    expect(result).toBe(isLoaded);
  });
});
