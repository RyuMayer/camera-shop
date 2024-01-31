import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, SortUrlParam } from '../../const';
import { TState } from '../../types/state';
import { sortBy } from '../../utils/sort';
import { isFilterUrlParamsValid, isSortUrlParamsValid } from '../../utils/url';
import { getFilteredCameras } from '../../utils/filter';
import { TUrlParams } from '../../types/url';

type TCamerasState = Pick<TState, typeof NameSpace.Cameras>;

export const selectCameras = (state: TCamerasState) =>
  state[NameSpace.Cameras].data;

export const selectLoadingStatus = (state: TCamerasState) =>
  state[NameSpace.Cameras].loadingStatus;

export const selectLoadedStatus = (state: TCamerasState) =>
  state[NameSpace.Cameras].isLoaded;

const selectSearchValue = (_state: TCamerasState, value: string) => value;

export const selectFoundCameras = createSelector(
  [selectCameras, selectSearchValue],
  (cameras, searchValue) =>
    searchValue.length >= 3
      ? cameras
          .filter((camera) => {
            const cameraNameWords = camera.name.toLowerCase().split(/\s+/);
            const searchWords = searchValue.toLowerCase().split(/\s+/);

            return searchWords.every((searchWord) =>
              cameraNameWords.some((cameraWord) =>
                cameraWord.includes(searchWord),
              ),
            );
          })
          .map((foundCamera) => ({
            id: foundCamera.id,
            name: foundCamera.name,
          }))
      : [],
);

const selectSortValues = (_state: TCamerasState, value: TUrlParams) => value;

export const selectSortedCameras = createSelector(
  [selectCameras, selectSortValues],
  (cameras, sortValues) => {
    const isUrlHasKeys = Boolean(Object.keys(sortValues).length);

    let sortedAndFilteredCameras = [...cameras];

    if (isFilterUrlParamsValid(sortValues)) {
      sortedAndFilteredCameras = getFilteredCameras(
        sortValues,
        sortedAndFilteredCameras,
      );
    }

    if (isUrlHasKeys && isSortUrlParamsValid(sortValues)) {
      const sortByKey = `${sortValues[SortUrlParam.SortBy] ?? ''}${sortValues[SortUrlParam.OrderBy] ?? ''}`;
      sortedAndFilteredCameras.sort(sortBy[sortByKey]);
    }

    return sortedAndFilteredCameras;
  },
);
