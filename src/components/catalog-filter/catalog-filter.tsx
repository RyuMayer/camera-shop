import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

import {
  CategoryFilter,
  FilterUrlParam,
  LevelFilter,
  TypeFilter,
} from './catalog-filter.const';
import { PAGINATION_URL_PARAM } from '../../const';
import { CatalogFilterPrice } from '../catalog-filter-price/catalog-filter-price';
import {
  getValidFilterUrlParams,
  isInputFilterCheked,
  isInputFilterDisabled,
} from '../../utils/filter';

export function CatalogFilter() {
  const [urlParams, setUrlParams] = useSearchParams();

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrlParams(getValidFilterUrlParams(urlParams, name, value));
  };

  const handleResetClick = () => {
    const test = urlParams.get(PAGINATION_URL_PARAM);

    if (test) {
      setUrlParams({
        [PAGINATION_URL_PARAM]: test,
      });
    } else {
      setUrlParams({});
    }
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogFilterPrice />
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Category}
                value={CategoryFilter.Photocamera}
                checked={
                  urlParams.get(FilterUrlParam.Category) ===
                  CategoryFilter.Photocamera
                }
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Category}
                value={CategoryFilter.Videocamera}
                checked={
                  urlParams.get(FilterUrlParam.Category) ===
                  CategoryFilter.Videocamera
                }
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Type}
                value={TypeFilter.Digital}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Type,
                  TypeFilter.Digital,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Type}
                value={TypeFilter.Film}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Type,
                  TypeFilter.Film,
                )}
                disabled={isInputFilterDisabled(
                  urlParams,
                  FilterUrlParam.Category,
                  CategoryFilter.Videocamera,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Type}
                value={TypeFilter.Instant}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Type,
                  TypeFilter.Instant,
                )}
                disabled={isInputFilterDisabled(
                  urlParams,
                  FilterUrlParam.Category,
                  CategoryFilter.Videocamera,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Type}
                value={TypeFilter.Сollectible}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Type,
                  TypeFilter.Сollectible,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Level}
                value={LevelFilter.Zero}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Level,
                  LevelFilter.Zero,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Level}
                value={LevelFilter.Аmateur}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Level,
                  LevelFilter.Аmateur,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Level}
                value={LevelFilter.Professional}
                checked={isInputFilterCheked(
                  urlParams,
                  FilterUrlParam.Level,
                  LevelFilter.Professional,
                )}
                onChange={handleFilterChange}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          onClick={handleResetClick}
          className="btn catalog-filter__reset-btn"
          type="reset"
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
