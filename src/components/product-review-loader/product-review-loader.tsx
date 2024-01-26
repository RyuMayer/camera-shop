import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchReview } from '../../store/review/review.action';
import {
  selectPostedStatus,
  selectLoadedStatus as selectReviewLoadedStatus,
  selectLoadingStatus as selectReviewLoadingStatus,
} from '../../store/review/review.selector';
import { Loader } from '../loader/loader';
import {
  selectCameraId,
  selectLoadedStatus as selectCameraLoadedStatus,
} from '../../store/camera/camera.selector';
import { dropReviewData } from '../../store/review/review';
import { ProductReview } from '../product-review/product-review';

export function ProductReviewLoader() {
  const dispatch = useAppDispatch();

  const productId = useAppSelector(selectCameraId);
  const isCameraLoaded = useAppSelector(selectCameraLoadedStatus);

  const reviewsLoadingStatus = useAppSelector(selectReviewLoadingStatus);
  const isReviewsLoaded = useAppSelector(selectReviewLoadedStatus);

  const isReviewPosted = useAppSelector(selectPostedStatus);

  useEffect(() => {
    let isMounted = true;

    if (isCameraLoaded && productId && isMounted) {
      dispatch(fetchReview(productId));
    }

    return () => {
      dispatch(dropReviewData());
      isMounted = false;
    };
  }, [dispatch, isCameraLoaded, productId]);

  useEffect(() => {
    let isMounted = true;

    if (isReviewPosted && productId && isMounted) {
      dispatch(fetchReview(productId));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, isReviewPosted, productId]);

  return (
    <Loader loadingStatus={reviewsLoadingStatus} isDataLoaded={isReviewsLoaded}>
      <ProductReview />
    </Loader>
  );
}
