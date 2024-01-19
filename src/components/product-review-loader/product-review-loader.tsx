import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchReview } from '../../store/review/review.action';
import {
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/review/similar.selector';
import { ProductReview } from '../product-review/product-review';
import { Loading } from '../loading/loading';

export function ProductReviewLoader() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const reviewsLoadingStatus = useAppSelector(selectLoadingStatus);
  const isReviewsLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    if (productId) {
      dispatch(fetchReview(productId));
    }
  }, [dispatch, productId]);

  return (
    <Loading
      loadingStatus={reviewsLoadingStatus}
      isDataLoaded={isReviewsLoaded}
    >
      <ProductReview />
    </Loading>
  );
}
