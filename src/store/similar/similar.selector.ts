import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectSimilar = (state: TState) => state[NameSpace.Similar].data;

export const selectLoadingStatus = (state: TState) =>
  state[NameSpace.Similar].loadingStatus;

export const selectLoadedStatus = (state: TState) =>
  state[NameSpace.Similar].isLoaded;
