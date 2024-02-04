import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

import { OrderBy, SortBy, SortUrlParam } from './catalog-sort.const';
import { getValidSortUrlParams } from '../../utils/sort';

export function CatalogSort() {
  const [urlParam, setUrlParam] = useSearchParams();

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrlParam(getValidSortUrlParams(urlParam, name, value));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name={SortUrlParam.SortBy}
                value={SortBy.PRICE}
                checked={urlParam.get(SortUrlParam.SortBy) === SortBy.PRICE}
                onChange={handleChangeSort}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name={SortUrlParam.SortBy}
                value={SortBy.POPULARITY}
                checked={
                  urlParam.get(SortUrlParam.SortBy) === SortBy.POPULARITY
                }
                onChange={handleChangeSort}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                aria-label="По возрастанию"
                name={SortUrlParam.OrderBy}
                value={OrderBy.ASC}
                checked={urlParam.get(SortUrlParam.OrderBy) === OrderBy.ASC}
                onChange={handleChangeSort}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                aria-label="По убыванию"
                name={SortUrlParam.OrderBy}
                value={OrderBy.DESC}
                checked={urlParam.get(SortUrlParam.OrderBy) === OrderBy.DESC}
                onChange={handleChangeSort}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
