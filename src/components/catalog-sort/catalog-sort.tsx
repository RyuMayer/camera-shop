import { useSearchParams } from 'react-router-dom';
import { OrderBy, SortBy, SortUrlParam } from '../../const';
import { getAllSearchParams } from '../../utils/url';

export function CatalogSort() {
  const [urlParam, setUrlParam] = useSearchParams();

  const handleChangeSort = (sortParam: { [key: string]: string }) => {
    let allParams = getAllSearchParams(urlParam);

    //FIXME: Настроить типы и переписать более лаконично
    if (
      SortUrlParam.SortBy in sortParam &&
      (!(SortUrlParam.OrderBy in allParams) ||
        !Object.values(OrderBy).some(
          (value) => value === allParams[SortUrlParam.OrderBy],
        ))
    ) {
      allParams = { ...allParams, [SortUrlParam.OrderBy]: OrderBy.ASC };
    } else if (
      SortUrlParam.OrderBy in sortParam &&
      (!(SortUrlParam.SortBy in allParams) ||
        !Object.values(SortBy).some(
          (value) => value === allParams[SortUrlParam.SortBy],
        ))
    ) {
      allParams = { ...allParams, [SortUrlParam.SortBy]: SortBy.PRICE };
    }

    setUrlParam({ ...allParams, ...sortParam });
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
                name="sort"
                checked={urlParam.get(SortUrlParam.SortBy) === SortBy.PRICE}
                onChange={() =>
                  handleChangeSort({ [SortUrlParam.SortBy]: SortBy.PRICE })
                }
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={
                  urlParam.get(SortUrlParam.SortBy) === SortBy.POPULARITY
                }
                onChange={() =>
                  handleChangeSort({ [SortUrlParam.SortBy]: SortBy.POPULARITY })
                }
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={urlParam.get(SortUrlParam.OrderBy) === OrderBy.ASC}
                onChange={() =>
                  handleChangeSort({ [SortUrlParam.OrderBy]: OrderBy.ASC })
                }
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
                name="sort-icon"
                aria-label="По убыванию"
                checked={urlParam.get(SortUrlParam.OrderBy) === OrderBy.DESC}
                onChange={() =>
                  handleChangeSort({ [SortUrlParam.OrderBy]: OrderBy.DESC })
                }
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
