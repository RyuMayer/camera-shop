import { Link } from 'react-router-dom';
import { PAGINATION_URL_PARAM } from '../../const';

export function Pagination({ onClick, currentPage, totalPage }) {
  const renderPageNumbers = () => {
    let pages = [];

    if (totalPage <= 3) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else if (currentPage === 1 || currentPage === 2) {
      pages = [1, 2, 3];
    } else if (currentPage === totalPage || currentPage === totalPage - 1) {
      pages = [totalPage - 2, totalPage - 1, totalPage];
    } else {
      pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    console.log(pages);

    return pages;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" href="1">
              Назад
            </a>
          </li>
        )}
        {renderPageNumbers().map((pageNumber) => (
          <li className="pagination__item">
            <Link
              to={`?${PAGINATION_URL_PARAM}=${pageNumber}`}
              className={`pagination__link ${
                pageNumber === currentPage ? 'pagination__link--active' : ''
              }`}
              onClick={() => onClick(pageNumber)}
            >
              {pageNumber}
            </Link>
            {/* <a
              className={`pagination__link ${
                pageNumber === currentPage ? 'pagination__link--active' : ''
              }`}
              href="1"
            >
              {pageNumber}
            </a> */}
          </li>
        ))}
        {currentPage < totalPage && (
          <li className="pagination__item">
            <a className="pagination__link pagination__link--text" href="3">
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
