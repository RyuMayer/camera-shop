import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchCamera } from '../../store/camera/camera.action';
import {
  selectCamera,
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/camera/camera.selector';
import { ProductCard } from '../product-card/product-card';
import { dropCameraData } from '../../store/camera/camera';

export function ProductCardLoader() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const camera = useAppSelector(selectCamera);
  const cameraLoadingStatus = useAppSelector(selectLoadingStatus);
  const isCameraLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    if (productId) {
      dispatch(fetchCamera(productId));
    }

    return () => {
      dispatch(dropCameraData());
    };
  }, [dispatch, productId]);

  return (
    <Loading loadingStatus={cameraLoadingStatus} isDataLoaded={isCameraLoaded}>
      {camera ? <ProductCard data={camera} /> : null}
    </Loading>
  );
}
