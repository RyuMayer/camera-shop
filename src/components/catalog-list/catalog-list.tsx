import { useEffect, useState } from 'react';

import { CameraCard } from '../camera-card/camera-card';
import { Pagination } from '../pagination/pagination';
import { usePaginate } from '../../hooks/usePaginate';
import { selectCameras } from '../../store/cameras/cameras.selector';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Loading } from '../loading/loading';
import { CARDS_PER_PAGE, LoadingStatus } from '../../const';

export function CatalogList() {
  const cameras = useAppSelector(selectCameras);
  const paginateData = usePaginate(cameras.length);

  const [isDataPaginated, setIsDataPaginated] = useState(false);

  const { firstIdx, lastIdx, currentPage, totalPage } = paginateData;

  console.log(paginateData, isDataPaginated);

  console.log('render');

  useEffect(() => {
    setIsDataPaginated(true);
    console.log('effect');
  }, [paginateData]);

  const onPaginationBtnClick = (page) => {
    if (currentPage !== page) {
      setIsDataPaginated(false);
    }
  };

  return (
    <Loading loadingStatus={LoadingStatus.Idle} isDataLoaded={isDataPaginated}>
      <>
        {currentPage <= totalPage && cameras.length > CARDS_PER_PAGE ? (
          <Pagination
            onClick={onPaginationBtnClick}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        ) : (
          <h1>Ошибка</h1>
        )}
        <div className="cards catalog__cards">
          {cameras.length === 0 ? (
            <h1>Нет доступных товаров.</h1>
          ) : (
            <>
              {cameras.slice(firstIdx, lastIdx).map((camera) => (
                <CameraCard key={camera.id} cameraData={camera} />
              ))}
            </>
          )}
        </div>
      </>
    </Loading>
  );
}
