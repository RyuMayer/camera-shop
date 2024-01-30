import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchCameras } from '../../store/cameras/cameras.action';
import { Loader } from '../loader/loader';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/cameras/cameras.selector';
import { CatalogContent } from '../catalog-content/catalog-content';
import { dropCamerasData } from '../../store/cameras/cameras';

export function CatalogLoader() {
  const dispatch = useAppDispatch();

  const camerasLoadingStatus = useAppSelector(selectLoadingStatus);
  const isCamerasLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(dropCamerasData());
      dispatch(fetchCameras());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <Loader loadingStatus={camerasLoadingStatus} isDataLoaded={isCamerasLoaded}>
      <CatalogContent />
    </Loader>
  );
}
