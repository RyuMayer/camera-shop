import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectPromos = (state: TState) => state[NameSpace.Promo].data;

export const selectLoadingStatus = (state: TState) =>
  state[NameSpace.Promo].loadingStatus;

export const selectLoadedStatus = (state: TState) =>
  state[NameSpace.Promo].isLoaded;
