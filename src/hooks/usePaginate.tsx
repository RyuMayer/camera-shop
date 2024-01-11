import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CARDS_PER_PAGE, PAGINATION_URL_PARAM } from '../const';
import { TCamera } from '../types/camera';

export function usePaginate(dataLength: number) {
  const [urlParams] = useSearchParams();
  const currentPage = Number(urlParams.get(PAGINATION_URL_PARAM)) || 1;

  const lastIdx = currentPage * CARDS_PER_PAGE;
  const firstIdx = lastIdx - CARDS_PER_PAGE;

  const [paginateData, setPaginatedData] = useState({
    currentPage,
    totalPage: Math.ceil(dataLength / CARDS_PER_PAGE),
    firstIdx,
    lastIdx,
  });

  useEffect(() => {
    console.log('123');
    setPaginatedData({
      currentPage,
      totalPage: Math.ceil(dataLength / CARDS_PER_PAGE),
      firstIdx,
      lastIdx,
    });
  }, [currentPage, dataLength, firstIdx, lastIdx, urlParams]);

  console.log('inside hook');
  return paginateData;
}
