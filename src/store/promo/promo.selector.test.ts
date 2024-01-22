import { LoadingStatus, NameSpace } from '../../const';
import {
  selectLoadedStatus,
  selectLoadingStatus,
  selectPromos,
} from './promo.selector';

describe('Promo selectors', () => {
  const state = {
    [NameSpace.Promo]: {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
    },
  };

  it('Should return promo data from state', () => {
    const { data } = state[NameSpace.Promo];
    const result = selectPromos(state);

    expect(result).toBe(data);
  });

  it('Should return loading status from state', () => {
    const { loadingStatus } = state[NameSpace.Promo];
    const result = selectLoadingStatus(state);

    expect(result).toBe(loadingStatus);
  });

  it('Should return loaded status from state', () => {
    const { isLoaded } = state[NameSpace.Promo];
    const result = selectLoadedStatus(state);

    expect(result).toBe(isLoaded);
  });
});
