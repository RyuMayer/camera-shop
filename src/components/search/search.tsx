import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../hooks/use-app-selector';
import { selectFoundCameras } from '../../store/cameras/cameras.selector';
import { normalizeSpaces } from '../../utils/search';
import { useLocation } from 'react-router-dom';
import { SearchList } from '../search-list/search-list';
import { TFoundCameras } from '../../types/search';

export function Search() {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const foundCameras: TFoundCameras[] = useAppSelector((state) =>
    selectFoundCameras(state, normalizeSpaces(searchValue)),
  );

  const handleResetBtn = useCallback(() => {
    setSearchValue('');
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  }, []);

  const handleInputBlur = useCallback(() => {
    setSearchValue((prevValue) => normalizeSpaces(prevValue));
  }, []);

  useEffect(() => {
    setSearchValue('');
  }, [location.pathname]);

  return (
    <div
      className={cn('form-search', {
        'list-opened': searchValue,
      })}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            value={searchValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
          />
        </label>
        {foundCameras.length !== 0 && (
          <SearchList foundCameras={foundCameras} />
        )}
      </form>
      <button
        onClick={handleResetBtn}
        className="form-search__reset"
        type="reset"
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
