import { NameSpace } from '../../const';
import { TState } from '../../types/state';

type TPromoState = Pick<TState, typeof NameSpace.Promo>;

export const selectPromos = (state: TPromoState) => state[NameSpace.Promo].data;

export const selectLoadingStatus = (state: TPromoState) =>
  state[NameSpace.Promo].loadingStatus;

export const selectLoadedStatus = (state: TPromoState) =>
  state[NameSpace.Promo].isLoaded;
