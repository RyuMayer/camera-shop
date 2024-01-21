import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { TState } from '../../types/state';
import { sortByCreationDate } from '../../utils/sort';

export const selectReviews = (state: TState) => state[NameSpace.Review].data;

export const selectSortedReviews = createSelector([selectReviews], (reviews) =>
  [...reviews].sort(sortByCreationDate),
);

export const selectLoadingStatus = (state: TState) =>
  state[NameSpace.Review].loadingStatus;

export const selectLoadedStatus = (state: TState) =>
  state[NameSpace.Review].isLoaded;

export const selectPostingStatus = (state: TState) =>
  state[NameSpace.Review].postingStatus;

export const selectPostedStatus = (state: TState) =>
  state[NameSpace.Review].isPosted;

export const selectOpenedStatus = (state: TState) =>
  state[NameSpace.Review].isPopupOpened;
