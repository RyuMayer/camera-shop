import { Link, createSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { PAGINATIONS_PER_PAGE, PAGINATION_URL_PARAM } from '../../const';
import { getPageNumbers } from '../../utils/paginate';
import { getAllSearchParams } from '../../utils/url';

type TPaginationProps = {
  currentPage: number;
  totalPage: number;
  urlParams: URLSearchParams;
};

export function Pagination({
  currentPage,
  totalPage,
  urlParams,
}: TPaginationProps) {
  const pages = getPageNumbers(totalPage, currentPage);

  const startPage = pages[0];
  const endPage = pages[pages.length - 1];

  const isPreviousBtnVisible = currentPage > PAGINATIONS_PER_PAGE;
  const isNextBtnVisible =
    currentPage <
    (totalPage % PAGINATIONS_PER_PAGE === 0
      ? totalPage - 2
      : totalPage - (totalPage % PAGINATIONS_PER_PAGE) + 1);

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {isPreviousBtnVisible && (
          <li className="pagination__item">
            <Link
              to={{
                search: createSearchParams({
                  ...getAllSearchParams(urlParams),
                  [PAGINATION_URL_PARAM]: (startPage - 1).toString(),
                }).toString(),
              }}
              className="pagination__link pagination__link--text"
            >
              Назад
            </Link>
          </li>
        )}
        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            className="pagination__item"
            data-testid="pagination-item"
          >
            <Link
              to={{
                search: createSearchParams({
                  ...getAllSearchParams(urlParams),
                  [PAGINATION_URL_PARAM]: pageNumber.toString(),
                }).toString(),
              }}
              className={cn('pagination__link', {
                'pagination__link--active': pageNumber === currentPage,
              })}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        {isNextBtnVisible && (
          <li className="pagination__item">
            <Link
              to={{
                search: createSearchParams({
                  ...getAllSearchParams(urlParams),
                  [PAGINATION_URL_PARAM]: (endPage + 1).toString(),
                }).toString(),
              }}
              className="pagination__link pagination__link--text"
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
