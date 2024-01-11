import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCameras } from '../../store/cameras/cameras.action';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/cameras/cameras.selector';
import { CatalogList } from '../catalog-list/catalog-list';

export function MainCatalog() {
  const dispatch = useAppDispatch();

  const camerasLoadingStatus = useAppSelector(selectLoadingStatus);
  const isCamerasLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    dispatch(fetchCameras());
  }, [dispatch]);

  return (
    <Loading
      loadingStatus={camerasLoadingStatus}
      isDataLoaded={isCamerasLoaded}
    >
      <CatalogList />
    </Loading>
  );
}
