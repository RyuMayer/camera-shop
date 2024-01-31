import { OrderBy, SortBy } from '../const';
import { TCamera } from '../types/camera';
import { TReview } from '../types/review';

export const sortByCreationDate = (a: TReview, b: TReview) => {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
};

export const sortBy = {
  [`${SortBy.PRICE}${OrderBy.ASC}`]: (a: TCamera, b: TCamera) =>
    a.price - b.price,
  [`${SortBy.PRICE}${OrderBy.DESC}`]: (a: TCamera, b: TCamera) =>
    b.price - a.price,
  [`${SortBy.POPULARITY}${OrderBy.ASC}`]: (a: TCamera, b: TCamera) =>
    a.rating !== b.rating ? a.rating - b.rating : a.reviewCount - b.reviewCount,
  [`${SortBy.POPULARITY}${OrderBy.DESC}`]: (a: TCamera, b: TCamera) =>
    a.rating !== b.rating ? b.rating - a.rating : b.reviewCount - a.reviewCount,
};
