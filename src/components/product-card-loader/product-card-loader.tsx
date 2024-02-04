import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Loader } from '../loader/loader';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchCamera } from '../../store/camera/camera.action';
import {
  selectCamera,
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/camera/camera.selector';
import { ProductCard } from '../product-card/product-card';
import { dropCameraData } from '../../store/camera/camera';
import { AppRoute } from '../../const';
import { dropCamerasData } from '../../store/cameras/cameras';
import { fetchCameras } from '../../store/cameras/cameras.action';

export function ProductCardLoader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const camera = useAppSelector(selectCamera);
  const cameraLoadingStatus = useAppSelector(selectLoadingStatus);
  const isCameraLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    let isMounted = true;

    if (productId && isMounted) {
      dispatch(fetchCameras());
      dispatch(fetchCamera(productId))
        .unwrap()
        .catch(() => navigate(AppRoute.NotFound));
    }

    return () => {
      dispatch(dropCamerasData());
      dispatch(dropCameraData());
      isMounted = false;
    };
  }, [dispatch, navigate, productId]);

  return (
    <Loader loadingStatus={cameraLoadingStatus} isDataLoaded={isCameraLoaded}>
      {camera && <ProductCard data={camera} />}
    </Loader>
  );
}
