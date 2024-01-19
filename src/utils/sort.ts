import { TReview } from '../types/review';

export function sortByCreationDate(a: TReview, b: TReview) {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
}
