import { LoadingStatus, NameSpace } from '../../const';
import { makeFakeReviewData } from '../../utils/mocks';
import { sortByCreationDate } from '../../utils/sort';
import {
  selectLoadedStatus,
  selectLoadingStatus,
  selectOpenedStatus,
  selectPostedStatus,
  selectPostingStatus,
  selectReviews,
  selectSortedReviews,
} from './review.selector';

describe('Review selectors', () => {
  const state = {
    [NameSpace.Review]: {
      data: [],
      loadingStatus: LoadingStatus.Idle,
      isLoaded: false,
      postingStatus: LoadingStatus.Idle,
      isPosted: false,
      isPopupOpened: false,
    },
  };

  it('Should return review data from state', () => {
    const { data } = state[NameSpace.Review];
    const result = selectReviews(state);

    expect(result).toBe(data);
  });

  it('Should return sorting review data from state', () => {
    const mockData = makeFakeReviewData();
    const stateWithData = {
      [NameSpace.Review]: {
        ...state[NameSpace.Review],
        data: mockData,
      },
    };

    const result = selectSortedReviews(stateWithData);
    const expectedResult = [...stateWithData[NameSpace.Review].data].sort(
      sortByCreationDate,
    );

    expect(result).toEqual(expectedResult);
  });

  it('Should return loading status from state', () => {
    const { loadingStatus } = state[NameSpace.Review];
    const result = selectLoadingStatus(state);

    expect(result).toBe(loadingStatus);
  });

  it('Should return loaded status from state', () => {
    const { isLoaded } = state[NameSpace.Review];
    const result = selectLoadedStatus(state);

    expect(result).toBe(isLoaded);
  });

  it('Should return posted status from state', () => {
    const { isPosted } = state[NameSpace.Review];
    const result = selectPostedStatus(state);

    expect(result).toBe(isPosted);
  });

  it('Should return posting status from state', () => {
    const { postingStatus } = state[NameSpace.Review];
    const result = selectPostingStatus(state);

    expect(result).toBe(postingStatus);
  });

  it('Should return opened status from state', () => {
    const { isPopupOpened } = state[NameSpace.Review];
    const result = selectOpenedStatus(state);

    expect(result).toBe(isPopupOpened);
  });
});
