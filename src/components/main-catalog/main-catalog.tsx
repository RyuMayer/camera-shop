import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCameras } from '../../store/cameras/cameras.action';
import { CameraCard } from '../camera-card/camera-card';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectCameras,
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/cameras/cameras.selector';
import { Pagination } from '../pagination/pagination';

export function MainCatalog() {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(selectCameras);
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
      <>
        <div className="cards catalog__cards">
          {cameras.length === 0 ? (
            <h1>Нет доступных товаров.</h1>
          ) : (
            <>
              {cameras.map((camera) => (
                <CameraCard key={camera.id} cameraData={camera} />
              ))}
            </>
          )}
        </div>
        {/* FIXME: Если нет товаров, пагинация остаётся! */}
        <Pagination />
      </>
    </Loading>
  );
}
