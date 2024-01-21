import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus as selectSimilarLoadedStatus,
  selectLoadingStatus as selectSeimilarLoadingStatus,
  selectSimilar,
} from '../../store/similar/similar.selector';
import { fetchSimilar } from '../../store/similar/similar.action';
import {
  selectCameraId,
  selectLoadedStatus as selectCameraLoadedStatus,
} from '../../store/camera/camera.selector';
import { dropSimilarData } from '../../store/similar/similar';
import { ProductSimilarSlider } from '../product-similar-slider/product-similar-slider';

export function ProductSimilarLoader() {
  const dispatch = useAppDispatch();

  const productId = useAppSelector(selectCameraId);
  const isCameraLoaded = useAppSelector(selectCameraLoadedStatus);

  const similarLoadingStatus = useAppSelector(selectSeimilarLoadingStatus);
  const isSimilarLoaded = useAppSelector(selectSimilarLoadedStatus);

  const similar = useAppSelector(selectSimilar);

  useEffect(() => {
    if (isCameraLoaded && productId) {
      dispatch(fetchSimilar(productId));
    }

    return () => {
      dispatch(dropSimilarData());
    };
  }, [dispatch, isCameraLoaded, productId]);

  return (
    <Loading
      loadingStatus={similarLoadingStatus}
      isDataLoaded={isSimilarLoaded}
    >
      {similar.length === 0 ? null : <ProductSimilarSlider similar={similar} />}
    </Loading>
  );
}
