import { NameSpace } from '../../const';
import { TState } from '../../types/state';

type TSimilarState = Pick<TState, typeof NameSpace.Similar>;

export const selectSimilar = (state: TSimilarState) =>
  state[NameSpace.Similar].data;

export const selectLoadingStatus = (state: TSimilarState) =>
  state[NameSpace.Similar].loadingStatus;

export const selectLoadedStatus = (state: TSimilarState) =>
  state[NameSpace.Similar].isLoaded;
