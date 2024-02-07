import { PriceUrlParam } from '../components/catalog-filter-price/catalog-filter-price.const';
import {
  CategoryFilter,
  CategoryFilterLocalized,
  FilterUrlParam,
  LevelFilter,
  LevelFilterLocalized,
  TypeFilter,
  TypeFilterLocalized,
  ValidFilter,
} from '../components/catalog-filter/catalog-filter.const';
import { FILTER_URL_PARAMS_SEPARATOR } from '../const';
import { TCamera } from '../types/camera';
import { TFilterUrlParams, TPriceUrlParams } from '../types/filter';
import { TUrlParams } from '../types/url';
import { getAllSearchParams } from './url';

export const getFilteredCameras = (
  sortValues: TUrlParams,
  cameras: TCamera[],
) => {
  const filterParams: TFilterUrlParams = {};

  for (const key in FilterUrlParam) {
    const sourceKey = FilterUrlParam[key as keyof typeof FilterUrlParam];
    if (sourceKey in sortValues) {
      filterParams[sourceKey] = sortValues[sourceKey];
    }
  }

  return cameras.filter((item) => {
    for (const key in filterParams) {
      const filterValue = filterParams[key as keyof TFilterUrlParams];
      if (filterValue) {
        const validParams = [];
        const currentValues = filterValue.split(FILTER_URL_PARAMS_SEPARATOR);

        for (let i = 0; i < currentValues.length; i++) {
          const isValidParam = ValidFilter[
            key as keyof typeof ValidFilter
          ].includes(currentValues[i]);

          if (!isValidParam) continue;

          switch (key) {
            case FilterUrlParam.Category: {
              validParams.push(
                CategoryFilterLocalized[
                  currentValues[i] as keyof typeof CategoryFilterLocalized
                ],
              );
              break;
            }
            case FilterUrlParam.Type: {
              validParams.push(
                TypeFilterLocalized[
                  currentValues[i] as keyof typeof TypeFilterLocalized
                ],
              );
              break;
            }
            case FilterUrlParam.Level: {
              validParams.push(
                LevelFilterLocalized[
                  currentValues[i] as keyof typeof LevelFilterLocalized
                ],
              );
              break;
            }
          }
        }

        if (
          validParams.length &&
          !validParams.some((param) => param === item[key as keyof TCamera])
        ) {
          return false;
        }
      }
    }
    return true;
  });
};

export const getFilteredByPriceCameras = (
  sortValues: TUrlParams,
  cameras: TCamera[],
) => {
  const filterParams: TPriceUrlParams = {};

  for (const key in PriceUrlParam) {
    const sourceKey = PriceUrlParam[key as keyof typeof PriceUrlParam];
    if (sourceKey in sortValues) {
      filterParams[sourceKey] = sortValues[sourceKey];
    }
  }

  const catalogPrices = cameras.map((camera) => camera.price);
  const [minCatalogPrice, maxCatalogPrice] = [
    Math.min(...catalogPrices),
    Math.max(...catalogPrices),
  ];

  const numberMinValueParam = Number(filterParams.minp);
  const numberMaxValueParam = Number(filterParams.maxp);

  const minimumPriceLimit =
    numberMinValueParam >= minCatalogPrice
      ? numberMinValueParam
      : minCatalogPrice;

  const maximumPriceLimit =
    numberMaxValueParam <= maxCatalogPrice
      ? numberMaxValueParam
      : maxCatalogPrice;

  return cameras.filter(
    (camera) =>
      camera.price >= minimumPriceLimit && camera.price <= maximumPriceLimit,
  );
};

export const isFilterUrlParamsValid = (sortValues: TUrlParams) => {
  const isValidCategory = Object.values(CategoryFilter).some(
    (value) => sortValues[FilterUrlParam.Category] === value,
  );

  const isValidType = Object.values(TypeFilter).some((value) =>
    sortValues[FilterUrlParam.Type]
      ?.split(FILTER_URL_PARAMS_SEPARATOR)
      .some((paramValue) => paramValue === value),
  );

  const isValidLevel = Object.values(LevelFilter).some((value) =>
    sortValues[FilterUrlParam.Level]
      ?.split(FILTER_URL_PARAMS_SEPARATOR)
      .some((paramValue) => paramValue === value),
  );

  const isValidKeys = Object.values(FilterUrlParam).some(
    (value) => value in sortValues,
  );

  return isValidKeys && (isValidCategory || isValidType || isValidLevel);
};

export const getValidFilterUrlParams = (
  urlParams: URLSearchParams,
  paramName: string,
  paramValue: string,
) => {
  let params: TUrlParams = {};

  switch (paramName) {
    case FilterUrlParam.Category: {
      if (urlParams.get(paramName) === paramValue) {
        urlParams.delete(paramName);
        params = { ...getAllSearchParams(urlParams) };
      } else {
        params = {
          ...getAllSearchParams(urlParams),
          [paramName]: paramValue,
        };
      }
      break;
    }
    case FilterUrlParam.Level:
    case FilterUrlParam.Type: {
      const splitParam = urlParams
        .get(paramName)
        ?.split(FILTER_URL_PARAMS_SEPARATOR);

      if (splitParam && !splitParam.includes(paramValue)) {
        urlParams.delete(paramName);
        const newParam = {
          [paramName]: `${splitParam.join(FILTER_URL_PARAMS_SEPARATOR)}${FILTER_URL_PARAMS_SEPARATOR}${paramValue}`,
        };

        params = { ...getAllSearchParams(urlParams), ...newParam };
      } else if (splitParam && splitParam.includes(paramValue)) {
        urlParams.delete(paramName);
        const newParam = splitParam
          .filter((param) => param !== paramValue)
          .join(FILTER_URL_PARAMS_SEPARATOR);

        if (newParam) {
          params = {
            ...getAllSearchParams(urlParams),
            [paramName]: newParam,
          };
        } else {
          params = { ...getAllSearchParams(urlParams) };
        }
      } else {
        params = {
          ...getAllSearchParams(urlParams),
          [paramName]: paramValue,
        };
      }
      break;
    }
  }

  if (
    params[FilterUrlParam.Category] &&
    params[FilterUrlParam.Type] &&
    params[FilterUrlParam.Category] === CategoryFilter.Videocamera
  ) {
    const filterParams = params[FilterUrlParam.Type]?.split(
      FILTER_URL_PARAMS_SEPARATOR,
    );
    const updatedFilterParams = filterParams?.filter(
      (param) => param !== TypeFilter.Film && param !== TypeFilter.Instant,
    );

    if (updatedFilterParams?.length) {
      params[FilterUrlParam.Type] = updatedFilterParams.join(
        FILTER_URL_PARAMS_SEPARATOR,
      );
    } else {
      delete params[FilterUrlParam.Type];
    }
  }

  return params;
};

export const isInputFilterCheked = (
  urlParam: URLSearchParams,
  name: string,
  value: string,
) => {
  const splitParam = urlParam.get(name)?.split(FILTER_URL_PARAMS_SEPARATOR);

  if (
    (value === TypeFilter.Film || value === TypeFilter.Instant) &&
    urlParam.get(FilterUrlParam.Category) === CategoryFilter.Videocamera
  ) {
    return false;
  }

  return Boolean(splitParam && splitParam.includes(value));
};

export const isInputFilterDisabled = (
  urlParam: URLSearchParams,
  name: string,
  value: string,
) => {
  return Boolean(urlParam.get(name) === value);
};

export const isPriceUrlParamsValid = (sortValues: TUrlParams) => {
  const isValidKeys = Object.values(PriceUrlParam).some(
    (value) => value in sortValues,
  );

  return isValidKeys;
};
