import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectNumberItemsInCart = (state: TState) =>
  state[NameSpace.Cart].data.length;

export const selectIsCameraInCart = (state: TState, id: number) =>
  state[NameSpace.Cart].data.find(({ product }) => product.id === id);
