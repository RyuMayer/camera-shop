import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

import {
  CategoryFilter,
  FilterUrlParam,
  LevelFilter,
  TypeFilter,
} from './catalog-filter.const';
import { getAllSearchParams, isInputFilterCheked } from '../../utils/url';

export function CatalogFilter() {
  const [urlParam, setUrlParam] = useSearchParams();

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case FilterUrlParam.Category: {
        if (urlParam.get(name) === value) {
          urlParam.delete(name);
          setUrlParam({ ...getAllSearchParams(urlParam) });
        } else {
          setUrlParam({ ...getAllSearchParams(urlParam), [name]: value });
        }
        break;
      }
      case FilterUrlParam.Level:
      case FilterUrlParam.Type: {
        const splitParam = urlParam.get(name)?.split('-');

        if (splitParam && !splitParam.includes(value)) {
          urlParam.delete(name);
          const newParam = { [name]: `${splitParam.join('-')}-${value}` };

          setUrlParam({ ...getAllSearchParams(urlParam), ...newParam });
        } else if (splitParam && splitParam.includes(value)) {
          urlParam.delete(name);
          const newParam = splitParam
            .filter((param) => param !== value)
            .join('-');

          if (newParam) {
            setUrlParam({ ...getAllSearchParams(urlParam), [name]: newParam });
          } else {
            setUrlParam({ ...getAllSearchParams(urlParam) });
          }
        } else {
          setUrlParam({ ...getAllSearchParams(urlParam), [name]: value });
        }
        break;
      }
    }
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={FilterUrlParam.Category}
                value={CategoryFilter.Photocamera}
                checked={
                  urlParam.get(FilterUrlParam.Category) ===
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
                  urlParam.get(FilterUrlParam.Category) ===
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
                  urlParam,
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
                  urlParam,
                  FilterUrlParam.Type,
                  TypeFilter.Film,
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
                  urlParam,
                  FilterUrlParam.Type,
                  TypeFilter.Instant,
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
                  urlParam,
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
                  urlParam,
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
                  urlParam,
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
                  urlParam,
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
        <button className="btn catalog-filter__reset-btn" type="reset">
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
