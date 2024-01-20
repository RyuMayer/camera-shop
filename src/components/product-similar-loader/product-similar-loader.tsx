import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus as selectSimilarLoadedStatus,
  selectLoadingStatus as selectSeimilarLoadingStatus,
} from '../../store/similar/similar.selector';
import { ProductSimilar } from '../product-similar/product-similar';
import { fetchSimilar } from '../../store/similar/similar.action';
import {
  selectCameraId,
  selectLoadedStatus as selectCameraLoadedStatus,
} from '../../store/camera/camera.selector';

export function ProductSimilarLoader() {
  const dispatch = useAppDispatch();

  const productId = useAppSelector(selectCameraId);
  const isCameraLoaded = useAppSelector(selectCameraLoadedStatus);

  const similarLoadingStatus = useAppSelector(selectSeimilarLoadingStatus);
  const isSimilarLoaded = useAppSelector(selectSimilarLoadedStatus);

  useEffect(() => {
    if (isCameraLoaded && productId) {
      dispatch(fetchSimilar(productId));
    }
  }, [dispatch, isCameraLoaded, productId]);

  return (
    <Loading
      loadingStatus={similarLoadingStatus}
      isDataLoaded={isSimilarLoaded}
    >
      <ProductSimilar />
    </Loading>
  );
}
