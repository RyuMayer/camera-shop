import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getAllSearchParams } from '../../utils/url';
import { selectSortedCameras } from '../../store/cameras/cameras.selector';
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PriceUrlParam } from './catalog-filter-price.const';
import { useIsFirstRender } from '../../hooks/use-is-first-render';

type TPriceState = {
  [PriceUrlParam.Min]: string;
  [PriceUrlParam.Max]: string;
};

export function CatalogFilterPrice() {
  const [urlParams, setUrlParams] = useSearchParams();
  const [price, setPrice] = useState<TPriceState>({
    [PriceUrlParam.Min]: '',
    [PriceUrlParam.Max]: '',
  });
  const isFirstRender = useIsFirstRender();

  const memoUrlParams = useMemo(
    () => getAllSearchParams(urlParams),
    [urlParams],
  );

  const {
    cameras,
    maxPrice: maxCatalogPrice,
    minPrice: minCatalogPrice,
  } = useAppSelector((state) => selectSortedCameras(state, memoUrlParams));

  const handleNumberInput = (name: string, value: string) => {
    const inputNumberValue = parseInt(value, 10);

    if (isNaN(inputNumberValue) || (!minCatalogPrice && !maxCatalogPrice)) {
      if (name === PriceUrlParam.Min && urlParams.get(PriceUrlParam.Min)) {
        urlParams.delete(PriceUrlParam.Min);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }

      if (name === PriceUrlParam.Max && urlParams.get(PriceUrlParam.Max)) {
        urlParams.delete(PriceUrlParam.Max);
        setUrlParams({ ...getAllSearchParams(urlParams) });
      }

      return;
    }

    if (inputNumberValue <= 0) {
      const defaultValues = {
        [PriceUrlParam.Min]: minCatalogPrice.toString(),
        [PriceUrlParam.Max]: maxCatalogPrice.toString(),
      };

      if (name === PriceUrlParam.Min || name === PriceUrlParam.Max) {
        const defaultValue = defaultValues[name] ? defaultValues[name] : '0';
        setPrice((prevValue) => ({ ...prevValue, [name]: defaultValue }));
        setUrlParams({ ...memoUrlParams, [name]: defaultValue });

        return;
      }
    }

    if (name === PriceUrlParam.Min) {
      const currentMaxPrice =
        Number(price[PriceUrlParam.Max]) || maxCatalogPrice;

      if (
        inputNumberValue < minCatalogPrice ||
        inputNumberValue > currentMaxPrice
      ) {
        setPrice((prevValue) => ({
          ...prevValue,
          [name]: minCatalogPrice.toString(),
        }));
        setUrlParams({ ...memoUrlParams, [name]: minCatalogPrice.toString() });
      } else {
        setUrlParams({ ...memoUrlParams, [name]: price[PriceUrlParam.Min] });
      }
    }

    if (name === PriceUrlParam.Max) {
      const currentMinPrice =
        Number(price[PriceUrlParam.Min]) || minCatalogPrice;

      if (
        inputNumberValue > maxCatalogPrice ||
        inputNumberValue < currentMinPrice
      ) {
        setPrice((prevValue) => ({
          ...prevValue,
          [name]: maxCatalogPrice.toString(),
        }));

        setUrlParams({ ...memoUrlParams, [name]: maxCatalogPrice.toString() });
      } else {
        setUrlParams({ ...memoUrlParams, [name]: price[PriceUrlParam.Max] });
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrice((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleNumberInput(name, value);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { name, value } = e.currentTarget;
      handleNumberInput(name, value);
    }
  };

  useEffect(() => {
    const minParamValue = urlParams.get(PriceUrlParam.Min);
    const maxParamValue = urlParams.get(PriceUrlParam.Max);

    if (isFirstRender) {
      if (
        minParamValue &&
        Number(minParamValue) <= maxCatalogPrice &&
        Number(minParamValue) >= minCatalogPrice
      ) {
        setPrice((prevValue) => ({
          ...prevValue,
          [PriceUrlParam.Min]: minParamValue,
        }));
      }

      if (
        maxParamValue &&
        Number(maxParamValue) <= maxCatalogPrice &&
        Number(maxParamValue) >= minCatalogPrice
      ) {
        setPrice((prevValue) => ({
          ...prevValue,
          [PriceUrlParam.Max]: maxParamValue,
        }));
      }
    }
  }, [isFirstRender, maxCatalogPrice, minCatalogPrice, urlParams]);

  useEffect(() => {
    if (
      !cameras.length &&
      (urlParams.get(PriceUrlParam.Min) || urlParams.get(PriceUrlParam.Max))
    ) {
      setPrice({ [PriceUrlParam.Min]: '', [PriceUrlParam.Max]: '' });

      urlParams.delete(PriceUrlParam.Min);
      urlParams.delete(PriceUrlParam.Max);

      setUrlParams({ ...getAllSearchParams(urlParams) });
    }

    if (!Object.keys(getAllSearchParams(urlParams)).length) {
      setPrice({ [PriceUrlParam.Min]: '', [PriceUrlParam.Max]: '' });
    }
  }, [cameras, setUrlParams, urlParams]);

  useEffect(() => {
    const maxPriceValue = parseInt(price[PriceUrlParam.Max], 10);
    const minPriceValue = parseInt(price[PriceUrlParam.Min], 10);

    const values = {
      min: minPriceValue.toString(),
      max: maxPriceValue.toString(),
    };

    if (
      !isNaN(maxPriceValue) &&
      (maxPriceValue > maxCatalogPrice || maxPriceValue < minCatalogPrice) &&
      maxCatalogPrice !== 0 &&
      urlParams.get(PriceUrlParam.Max)
    ) {
      setPrice((prevValue) => ({
        ...prevValue,
        [PriceUrlParam.Max]: maxCatalogPrice.toString(),
      }));

      values.max = maxCatalogPrice.toString();
    }

    if (
      !isNaN(minPriceValue) &&
      (minPriceValue < maxCatalogPrice || minPriceValue > minCatalogPrice) &&
      minCatalogPrice !== 0 &&
      urlParams.get(PriceUrlParam.Min)
    ) {
      setPrice((prevValue) => ({
        ...prevValue,
        [PriceUrlParam.Min]: minCatalogPrice.toString(),
      }));

      values.min = minCatalogPrice.toString();
    }

    if (
      !isNaN(minPriceValue) &&
      !isNaN(maxPriceValue) &&
      maxCatalogPrice !== 0 &&
      minCatalogPrice !== 0 &&
      urlParams.get(PriceUrlParam.Min) &&
      urlParams.get(PriceUrlParam.Min)
    ) {
      setUrlParams({
        ...memoUrlParams,
        [PriceUrlParam.Min]: values.min,
        [PriceUrlParam.Max]: values.max,
      });
    }
  }, [maxCatalogPrice, minCatalogPrice]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name={PriceUrlParam.Min}
              value={price[PriceUrlParam.Min]}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeydown}
              disabled={Boolean(!minCatalogPrice)}
              placeholder={`от ${minCatalogPrice || ''}`}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name={PriceUrlParam.Max}
              value={price[PriceUrlParam.Max]}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeydown}
              disabled={Boolean(!maxCatalogPrice)}
              placeholder={`до ${maxCatalogPrice || ''}`}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
