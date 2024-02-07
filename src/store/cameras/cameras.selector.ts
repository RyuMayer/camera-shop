import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { TState } from '../../types/state';
import { isSortUrlParamsValid, sortBy } from '../../utils/sort';

import {
  getFilteredByPriceCameras,
  getFilteredCameras,
  isFilterUrlParamsValid,
  isPriceUrlParamsValid,
} from '../../utils/filter';
import { TUrlParams } from '../../types/url';
import { SortUrlParam } from '../../components/catalog-sort/catalog-sort.const';
import { MIN_LENGTH_FOR_SEARCH } from '../../components/search/search.const';

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
    searchValue.length >= MIN_LENGTH_FOR_SEARCH
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

export const selectFilteredSortedCameras = createSelector(
  [selectCameras, selectSortValues],
  (cameras, sortValues) => {
    let sortedCameras = [...cameras];

    if (isFilterUrlParamsValid(sortValues)) {
      sortedCameras = getFilteredCameras(sortValues, sortedCameras);
    }

    if (isPriceUrlParamsValid(sortValues)) {
      sortedCameras = getFilteredByPriceCameras(sortValues, sortedCameras);
    }

    if (isSortUrlParamsValid(sortValues)) {
      const sortByKey = `${sortValues[SortUrlParam.SortBy] ?? ''}${sortValues[SortUrlParam.OrderBy] ?? ''}`;
      sortedCameras.sort(sortBy[sortByKey]);
    }

    return sortedCameras;
  },
);

export const selectMinMaxFilteredCemerasPrice = createSelector(
  [selectCameras, selectSortValues],
  (cameras, sortValues) => {
    if (isFilterUrlParamsValid(sortValues)) {
      cameras = getFilteredCameras(sortValues, cameras);
    }
    const prices = cameras.map((camera) => camera.price);

    if (prices.length) {
      return [Math.min(...prices), Math.max(...prices)];
    }

    return [undefined, undefined];
  },
);
