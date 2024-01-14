import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectCamera = (state: TState) => state[NameSpace.Camera].data;

export const selectLoadingStatus = (state: TState) =>
  state[NameSpace.Camera].loadingStatus;

export const selectLoadedStatus = (state: TState) =>
  state[NameSpace.Camera].isLoaded;
