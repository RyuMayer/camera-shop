import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Loader } from '../loader/loader';
import { useAppSelector } from '../../hooks/use-app-selector';
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

  const similarCameras = useAppSelector(selectSimilar);

  useEffect(() => {
    let isMounted = true;

    if (isCameraLoaded && productId && isMounted) {
      dispatch(fetchSimilar(productId));
    }

    return () => {
      dispatch(dropSimilarData());
      isMounted = false;
    };
  }, [dispatch, isCameraLoaded, productId]);

  return (
    <Loader loadingStatus={similarLoadingStatus} isDataLoaded={isSimilarLoaded}>
      {similarCameras.length !== 0 && (
        <ProductSimilarSlider similarCameras={similarCameras} />
      )}
    </Loader>
  );
}
