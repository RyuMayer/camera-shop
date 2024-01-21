import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchReview } from '../../store/review/review.action';
import {
  selectPostedStatus,
  selectLoadedStatus as selectReviewLoadedStatus,
  selectLoadingStatus as selectReviewLoadingStatus,
} from '../../store/review/similar.selector';
import { Loading } from '../loading/loading';
import {
  selectCameraId,
  selectLoadedStatus as selectCameraLoadedStatus,
} from '../../store/camera/camera.selector';
import { ProductReviewList } from '../product-review-list/product-review-list';
import { dropReviewData } from '../../store/review/review';

export function ProductReviewLoader() {
  const dispatch = useAppDispatch();

  const productId = useAppSelector(selectCameraId);
  const isCameraLoaded = useAppSelector(selectCameraLoadedStatus);

  const reviewsLoadingStatus = useAppSelector(selectReviewLoadingStatus);
  const isReviewsLoaded = useAppSelector(selectReviewLoadedStatus);

  const isReviewPosted = useAppSelector(selectPostedStatus);

  useEffect(() => {
    if (isCameraLoaded && productId) {
      dispatch(fetchReview(productId));
    }

    return () => {
      dispatch(dropReviewData());
    };
  }, [dispatch, isCameraLoaded, productId]);

  useEffect(() => {
    if (isReviewPosted && productId) {
      dispatch(fetchReview(productId));
    }
  }, [dispatch, isReviewPosted, productId]);

  return (
    <Loading
      loadingStatus={reviewsLoadingStatus}
      isDataLoaded={isReviewsLoaded}
    >
      <ProductReviewList />
    </Loading>
  );
}
