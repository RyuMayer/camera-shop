import { LoadingStatus, NameSpace } from '../../const';
import {
  selectLoadedStatus,
  selectLoadingStatus,
  selectSimilar,
} from './similar.selector';

describe('Similar selectors', () => {
  const state = {
    [NameSpace.Similar]: {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    },
  };

  it('Should return similar data from state', () => {
    const { data } = state[NameSpace.Similar];
    const result = selectSimilar(state);

    expect(result).toBe(data);
  });

  it('Should return loading status from state', () => {
    const { loadingStatus } = state[NameSpace.Similar];
    const result = selectLoadingStatus(state);

    expect(result).toBe(loadingStatus);
  });

  it('Should return loaded status from state', () => {
    const { isLoaded } = state[NameSpace.Similar];
    const result = selectLoadedStatus(state);

    expect(result).toBe(isLoaded);
  });
});
