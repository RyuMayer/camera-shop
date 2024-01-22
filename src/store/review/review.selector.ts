import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { TState } from '../../types/state';
import { sortByCreationDate } from '../../utils/sort';

type TReviewState = Pick<TState, typeof NameSpace.Review>;

export const selectReviews = (state: TReviewState) =>
  state[NameSpace.Review].data;

export const selectSortedReviews = createSelector([selectReviews], (reviews) =>
  [...reviews].sort(sortByCreationDate),
);

export const selectLoadingStatus = (state: TReviewState) =>
  state[NameSpace.Review].loadingStatus;

export const selectLoadedStatus = (state: TReviewState) =>
  state[NameSpace.Review].isLoaded;

export const selectPostingStatus = (state: TReviewState) =>
  state[NameSpace.Review].postingStatus;

export const selectPostedStatus = (state: TReviewState) =>
  state[NameSpace.Review].isPosted;

export const selectOpenedStatus = (state: TReviewState) =>
  state[NameSpace.Review].isPopupOpened;
