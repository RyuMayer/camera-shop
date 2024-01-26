import { TReview } from '../types/review';

export const sortByCreationDate = (a: TReview, b: TReview) => {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
};
