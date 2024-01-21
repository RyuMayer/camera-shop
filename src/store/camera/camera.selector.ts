import { NameSpace } from '../../const';
import { TState } from '../../types/state';

type TCameraState = Pick<TState, typeof NameSpace.Camera>;

export const selectCamera = (state: TCameraState) =>
  state[NameSpace.Camera].data;

export const selectCameraName = (state: TCameraState) =>
  state[NameSpace.Camera].data?.name;

export const selectCameraId = (state: TCameraState) =>
  state[NameSpace.Camera].data?.id;

export const selectLoadingStatus = (state: TCameraState) =>
  state[NameSpace.Camera].loadingStatus;

export const selectLoadedStatus = (state: TCameraState) =>
  state[NameSpace.Camera].isLoaded;
