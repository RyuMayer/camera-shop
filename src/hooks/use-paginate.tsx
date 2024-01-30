import { CARDS_PER_PAGE, PAGINATION_URL_PARAM } from '../const';

export function usePaginate(dataLength: number, urlParams: URLSearchParams) {
  const currentParams = Number(urlParams.get(PAGINATION_URL_PARAM)) || 1;

  const totalPage = Math.ceil(dataLength / CARDS_PER_PAGE);
  const currentPage = currentParams > totalPage ? 1 : currentParams;

  const lastIdx = currentPage * CARDS_PER_PAGE;
  const firstIdx = lastIdx - CARDS_PER_PAGE;

  return {
    currentPage,
    totalPage,
    firstIdx,
    lastIdx,
  };
}
