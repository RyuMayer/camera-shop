import { useEffect, useMemo } from 'react';

import { CameraCard } from '../camera-card/camera-card';
import { Pagination } from '../pagination/pagination';
import { usePaginate } from '../../hooks/use-paginate';
import { selectFilteredSortedCameras } from '../../store/cameras/cameras.selector';
import { useAppSelector } from '../../hooks/use-app-selector';
import { CARDS_PER_PAGE } from '../../const';
import { useSearchParams } from 'react-router-dom';
import { getAllSearchParams } from '../../utils/url';

export function CatalogList() {
  const [urlParams] = useSearchParams();

  const memoUrlParams = useMemo(
    () => getAllSearchParams(urlParams),
    [urlParams],
  );

  const sortedCameras = useAppSelector((state) =>
    selectFilteredSortedCameras(state, memoUrlParams),
  );

  const paginatedData = usePaginate(sortedCameras.length, urlParams);

  const { firstIdx, lastIdx, currentPage, totalPage } = paginatedData;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  return sortedCameras.length === 0 ? (
    <h1>По вашему запросу ничего не найдено.</h1>
  ) : (
    <>
      <div className="cards catalog__cards">
        {sortedCameras.slice(firstIdx, lastIdx).map((camera) => (
          <CameraCard key={camera.id} cameraData={camera} />
        ))}
      </div>
      {sortedCameras.length > CARDS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          urlParams={urlParams}
        />
      )}
    </>
  );
}
