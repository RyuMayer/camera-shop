import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PriceUrlParam } from './catalog-filter-price.const';
import { getAllSearchParams } from '../../utils/url';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectMinMaxSortedCemerasPrice } from '../../store/cameras/cameras.selector';
import { useIsFirstRender } from '../../hooks/use-is-first-render';

export function CatalogFilterPrice() {
  const [urlParams, setUrlParams] = useSearchParams();
  const isFirstRender = useIsFirstRender();

  const inputMinRef = useRef<HTMLInputElement>(null);
  const inputMaxRef = useRef<HTMLInputElement>(null);

  const memoUrlParams = useMemo(() => {
    return getAllSearchParams(urlParams);
  }, [urlParams]);

  const [minCatalogPrice, maxCatalogPrice] = useAppSelector((state) =>
    selectMinMaxSortedCemerasPrice(state, memoUrlParams),
  );

  const changeInputNumber = (name: string, value: string) => {
    const inputMin = inputMinRef.current;
    const inputMax = inputMaxRef.current;

    if (!minCatalogPrice || !maxCatalogPrice) return;

    const updateInputAndUrlParams = (
      currenValue: number,
      inputRef: HTMLInputElement | null,
      catalogPrice: { min: number | null; max: number | null },
      urlParamKey: string,
    ) => {
      if (!inputRef || isNaN(currenValue)) {
        if (inputRef) inputRef.value = '';

        urlParams.delete(urlParamKey);
        setUrlParams({ ...getAllSearchParams(urlParams) });

        return;
      }

      if (!catalogPrice.min || !catalogPrice.max) return;

      let newValue = '';

      if (currenValue < catalogPrice.min || currenValue > catalogPrice.max) {
        newValue =
          urlParamKey === PriceUrlParam.Min
            ? catalogPrice.min.toString()
            : catalogPrice.max.toString();
      } else {
        newValue = currenValue.toString();
      }

      inputRef.value = newValue;
      setUrlParams({
        ...getAllSearchParams(urlParams),
        [urlParamKey]: newValue,
      });
    };

    if (inputMin && name === inputMin.name) {
      updateInputAndUrlParams(
        parseInt(value, 10),
        inputMin,
        { min: minCatalogPrice, max: maxCatalogPrice },
        PriceUrlParam.Min,
      );
    }

    if (inputMax && name === inputMax.name) {
      updateInputAndUrlParams(
        parseInt(value, 10),
        inputMax,
        { min: minCatalogPrice, max: maxCatalogPrice },
        PriceUrlParam.Max,
      );
    }
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    changeInputNumber(name, value);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { name, value } = e.currentTarget;
      changeInputNumber(name, value);
    }
  };

  useEffect(() => {
    if (!minCatalogPrice || !maxCatalogPrice) {
      if (urlParams.get(PriceUrlParam.Min) && inputMinRef.current) {
        inputMinRef.current.value = '';

        urlParams.delete(PriceUrlParam.Min);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }

      if (urlParams.get(PriceUrlParam.Max) && inputMaxRef.current) {
        inputMaxRef.current.value = '';

        urlParams.delete(PriceUrlParam.Max);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }
    }

    if (minCatalogPrice && maxCatalogPrice) {
      const inputMin = inputMinRef.current;
      const inputMax = inputMaxRef.current;

      if (inputMin) {
        const minInputValue = parseInt(inputMin.value, 10);

        if (
          !isNaN(minInputValue) &&
          (minInputValue < minCatalogPrice || minInputValue > maxCatalogPrice)
        ) {
          inputMin.value = '';

          urlParams.delete(PriceUrlParam.Min);
          setUrlParams({ ...getAllSearchParams(urlParams) });
        }
      }

      if (inputMax) {
        const maxInputValue = parseInt(inputMax.value, 10);

        if (
          !isNaN(maxInputValue) &&
          (maxInputValue < minCatalogPrice || maxInputValue > maxCatalogPrice)
        ) {
          inputMax.value = '';

          urlParams.delete(PriceUrlParam.Max);
          setUrlParams({ ...getAllSearchParams(urlParams) });
        }
      }
    }
  }, [maxCatalogPrice, minCatalogPrice, setUrlParams, urlParams]);

  useEffect(() => {
    if (inputMinRef.current && inputMaxRef.current) {
      const numberMinValue = Number(inputMinRef.current.value);
      const numberMaxValue = Number(inputMaxRef.current.value);

      if (numberMaxValue < numberMinValue) {
        inputMaxRef.current.value = '';

        urlParams.delete(PriceUrlParam.Max);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }
    }
  }, [
    inputMinRef.current?.value,
    inputMaxRef.current?.value,
    urlParams,
    setUrlParams,
  ]);

  useEffect(() => {
    if (
      !urlParams.get(PriceUrlParam.Min) &&
      !urlParams.get(PriceUrlParam.Max)
    ) {
      if (inputMaxRef.current && inputMaxRef.current.value) {
        inputMaxRef.current.value = '';
      }

      if (inputMinRef.current && inputMinRef.current.value) {
        inputMinRef.current.value = '';
      }
    }
  }, [urlParams]);

  useEffect(() => {
    if (isFirstRender) {
      const minParam = urlParams.get(PriceUrlParam.Min);
      const maxParam = urlParams.get(PriceUrlParam.Max);

      if (minParam) {
        if (inputMinRef.current) inputMinRef.current.value = minParam;
      }

      if (maxParam) {
        if (inputMaxRef.current) inputMaxRef.current.value = maxParam;
      }
    }
  }, [isFirstRender, urlParams]);

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
              placeholder={minCatalogPrice ? `от ${minCatalogPrice}` : ''}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeydown}
              disabled={!minCatalogPrice}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              ref={inputMaxRef}
              type="number"
              name={PriceUrlParam.Max}
              placeholder={maxCatalogPrice ? `до ${maxCatalogPrice}` : ''}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeydown}
              disabled={!maxCatalogPrice}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
