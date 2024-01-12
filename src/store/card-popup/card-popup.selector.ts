import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectCardPopupData = (state: TState) =>
  state[NameSpace.CardPopup].data;

export const selectPopupOpenedStatus = (state: TState) =>
  state[NameSpace.CardPopup].isOpened;
