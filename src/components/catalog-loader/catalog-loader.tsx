import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCameras } from '../../store/cameras/cameras.action';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
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
    dispatch(fetchCameras());
    return () => {
      dispatch(dropCamerasData());
    };
  }, [dispatch]);

  return (
    <Loading
      loadingStatus={camerasLoadingStatus}
      isDataLoaded={isCamerasLoaded}
    >
      <CatalogContent />
    </Loading>
  );
}
