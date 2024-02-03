import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PriceUrlParam } from './catalog-filter-price.const';
import { getAllSearchParams } from '../../utils/url';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectSortedCameras } from '../../store/cameras/cameras.selector';

export function CatalogFilterPrice() {
  const [urlParams, setUrlParams] = useSearchParams();

  const inputMinRef = useRef<HTMLInputElement>(null);
  const inputMaxRef = useRef<HTMLInputElement>(null);

  const memoUrlParams = useMemo(() => {
    return getAllSearchParams(urlParams);
  }, [urlParams]);

  const sortedCameras = useAppSelector((state) =>
    selectSortedCameras(state, memoUrlParams),
  );

  const [minCatalogPrice, maxCatalogPrice] = useMemo(() => {
    if (!sortedCameras.length) return [undefined, undefined];

    const prices = sortedCameras.map((camera) => camera.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [sortedCameras]);

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentNumberValue = parseInt(value, 10);

    const inputMin = inputMinRef.current;
    const inputMax = inputMaxRef.current;

    if (inputMin && name === inputMin.name) {
      if (!isNaN(currentNumberValue)) {
        if (!minCatalogPrice) {
          inputMin.value = '';

          urlParams.delete(PriceUrlParam.Min);
          setUrlParams({ ...getAllSearchParams(urlParams) });

          return;
        }

        if (
          currentNumberValue < minCatalogPrice ||
          currentNumberValue > maxCatalogPrice
        ) {
          inputMin.value = minCatalogPrice.toString();
          setUrlParams({
            ...getAllSearchParams(urlParams),
            [PriceUrlParam.Min]: inputMin.value,
          });
        } else {
          inputMin.value = currentNumberValue.toString();
          setUrlParams({
            ...getAllSearchParams(urlParams),
            [PriceUrlParam.Min]: inputMin.value,
          });
        }
      } else {
        inputMin.value = '';

        urlParams.delete(PriceUrlParam.Min);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }
    }

    if (inputMax && name === inputMax.name) {
      if (!isNaN(currentNumberValue)) {
        if (!maxCatalogPrice) {
          inputMax.value = '';

          urlParams.delete(PriceUrlParam.Max);
          setUrlParams({ ...getAllSearchParams(urlParams) });

          return;
        }

        if (
          currentNumberValue < minCatalogPrice ||
          currentNumberValue > maxCatalogPrice
        ) {
          inputMax.value = maxCatalogPrice.toString();
          setUrlParams({
            ...getAllSearchParams(urlParams),
            [PriceUrlParam.Max]: inputMax.value,
          });
        } else {
          inputMax.value = currentNumberValue.toString();
          setUrlParams({
            ...getAllSearchParams(urlParams),
            [PriceUrlParam.Max]: inputMax.value,
          });
        }
      } else {
        inputMax.value = '';

        urlParams.delete(PriceUrlParam.Max);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }
    }
  };

  useEffect(() => {
    if (
      !minCatalogPrice &&
      urlParams.get(PriceUrlParam.Min) &&
      inputMinRef.current
    ) {
      inputMinRef.current.value = '';

      urlParams.delete(PriceUrlParam.Min);
      setUrlParams({ ...getAllSearchParams(urlParams) });
    }

    if (
      !maxCatalogPrice &&
      urlParams.get(PriceUrlParam.Max) &&
      inputMaxRef.current
    ) {
      inputMaxRef.current.value = '';

      urlParams.delete(PriceUrlParam.Max);
      setUrlParams({ ...getAllSearchParams(urlParams) });
    }
  }, [maxCatalogPrice, minCatalogPrice, setUrlParams, urlParams]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              ref={inputMinRef}
              type="number"
              name={PriceUrlParam.Min}
              placeholder="от"
              onBlur={handleInputBlur}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              ref={inputMaxRef}
              type="number"
              name={PriceUrlParam.Max}
              placeholder="до"
              onBlur={handleInputBlur}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
