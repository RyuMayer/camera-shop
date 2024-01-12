import { memo } from 'react';

import { Filter } from '../../components/filter/filter';
import { MainCatalog } from '../../components/main-catalog/main-catalog';

function CatalogContent() {
  return (
    <div className="page-content">
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link" href="index.html">
                Главная
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </a>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* TODO: Убрать в каталог! */}
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <div className="catalog__aside">
              <Filter />
            </div>
            <div className="catalog__content">
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
                          defaultChecked
                        />
                        <label htmlFor="sortPrice">по цене</label>
                      </div>
                      <div className="catalog-sort__btn-text">
                        <input type="radio" id="sortPopular" name="sort" />
                        <label htmlFor="sortPopular">по популярности</label>
                      </div>
                    </div>
                    <div className="catalog-sort__order">
                      <div className="catalog-sort__btn catalog-sort__btn--up">
                        <input
                          type="radio"
                          id="up"
                          name="sort-icon"
                          defaultChecked
                          aria-label="По возрастанию"
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
              <MainCatalog />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const CatalogContentMemo = memo(CatalogContent);
export default CatalogContentMemo;
