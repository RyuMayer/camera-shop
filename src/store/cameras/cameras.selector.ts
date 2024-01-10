import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const selectCameras = (state: TState) => state[NameSpace.Cameras].data;

export const selectLoadingStatus = (state: TState) =>
  state[NameSpace.Cameras].loadingStatus;

export const selectLoadedStatus = (state: TState) =>
  state[NameSpace.Cameras].isLoaded;
