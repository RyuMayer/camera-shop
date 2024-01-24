import { CameraCard } from '../camera-card/camera-card';
import { Pagination } from '../pagination/pagination';
import { usePaginate } from '../../hooks/usePaginate';
import { selectCameras } from '../../store/cameras/cameras.selector';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CARDS_PER_PAGE } from '../../const';
import { useEffect } from 'react';

export function CatalogList() {
  const cameras = useAppSelector(selectCameras);
  const paginatedData = usePaginate(cameras.length);

  const { firstIdx, lastIdx, currentPage, totalPage } = paginatedData;

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return cameras.length === 0 ? (
    <h1>Нет доступных товаров.</h1>
  ) : (
    <>
      <div className="cards catalog__cards">
        {cameras.slice(firstIdx, lastIdx).map((camera) => (
          <CameraCard key={camera.id} cameraData={camera} />
        ))}
      </div>
      {cameras.length > CARDS_PER_PAGE && (
        <Pagination currentPage={currentPage} totalPage={totalPage} />
      )}
    </>
  );
}
