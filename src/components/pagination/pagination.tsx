import { Link } from 'react-router-dom';
import cn from 'classnames';

import { PAGINATION_URL_PARAM } from '../../const';
import { getPageNumbers } from '../../utils/paginate';

type TPaginationProps = {
  currentPage: number;
  totalPage: number;
};

export function Pagination({ currentPage, totalPage }: TPaginationProps) {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <Link
              to={`?${PAGINATION_URL_PARAM}=${currentPage - 1}`}
              className="pagination__link pagination__link--text"
            >
              Назад
            </Link>
          </li>
        )}
        {getPageNumbers(totalPage, currentPage).map((pageNumber) => (
          <li key={pageNumber} className="pagination__item">
            <Link
              to={`?${PAGINATION_URL_PARAM}=${pageNumber}`}
              className={cn('pagination__link', {
                'pagination__link--active': pageNumber === currentPage,
              })}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        {currentPage < totalPage && (
          <li className="pagination__item">
            <Link
              to={`?${PAGINATION_URL_PARAM}=${currentPage + 1}`}
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
