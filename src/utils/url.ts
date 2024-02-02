import {
  CategoryFilter,
  FilterUrlParam,
  LevelFilter,
  TypeFilter,
} from '../components/catalog-filter/catalog-filter.const';
import { OrderBy, SortBy, SortUrlParam } from '../const';
import { TUrlParams } from '../types/url';

export const getAllSearchParams = (params: URLSearchParams) => {
  let allParams = {};

  for (const [key, value] of params.entries()) {
    allParams = { ...allParams, [key]: value };
  }

  return allParams;
};

const isValidParamExist = (
  urlParams: URLSearchParams,
  getParam: string,
  paramValues: object,
) => {
  return (
    !urlParams.get(getParam) ||
    !Object.values(paramValues).some(
      (value) => value === urlParams.get(getParam),
    )
  );
};

export const isSortUrlParamsValid = (sortValues: { [key: string]: string }) => {
  const isValidSortBy = Object.values(SortBy).some(
    (value) => sortValues[SortUrlParam.SortBy] === value,
  );
  const isValidOrderBy = Object.values(OrderBy).some(
    (value) => sortValues[SortUrlParam.OrderBy] === value,
  );
  const isValidKeys = Object.values(SortUrlParam).every(
    (key) => key in sortValues,
  );

  return isValidSortBy && isValidOrderBy && isValidKeys;
};

export const isFilterUrlParamsValid = (sortValues: TUrlParams) => {
  const isValidCategory = Object.values(CategoryFilter).some(
    (value) => sortValues[FilterUrlParam.Category] === value,
  );

  const isValidType = Object.values(TypeFilter).some((value) =>
    sortValues[FilterUrlParam.Type]
      ?.split('-')
      .some((paramValue) => paramValue === value),
  );

  const isValidLevel = Object.values(LevelFilter).some((value) =>
    sortValues[FilterUrlParam.Level]
      ?.split('-')
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
      const splitParam = urlParams.get(paramName)?.split('-');

      if (splitParam && !splitParam.includes(paramValue)) {
        urlParams.delete(paramName);
        const newParam = {
          [paramName]: `${splitParam.join('-')}-${paramValue}`,
        };

        params = { ...getAllSearchParams(urlParams), ...newParam };
      } else if (splitParam && splitParam.includes(paramValue)) {
        urlParams.delete(paramName);
        const newParam = splitParam
          .filter((param) => param !== paramValue)
          .join('-');

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
    const filterParams = params[FilterUrlParam.Type]?.split('-');
    const updatedFilterParams = filterParams?.filter(
      (param) => param !== TypeFilter.Film && param !== TypeFilter.Instant,
    );

    if (updatedFilterParams?.length) {
      params[FilterUrlParam.Type] = updatedFilterParams.join('-');
    } else {
      delete params[FilterUrlParam.Type];
    }
  }

  return params;
};

export const getValidSortUrlParams = (
  urlParams: URLSearchParams,
  paramName: string,
  paramValue: string,
) => {
  let params = { ...getAllSearchParams(urlParams) };

  switch (paramName) {
    case SortUrlParam.SortBy: {
      if (isValidParamExist(urlParams, SortUrlParam.OrderBy, OrderBy)) {
        params = {
          ...params,
          [SortUrlParam.OrderBy]: OrderBy.ASC,
        };
      }
      break;
    }
    case SortUrlParam.OrderBy: {
      if (isValidParamExist(urlParams, SortUrlParam.SortBy, SortBy)) {
        params = {
          ...params,
          [SortUrlParam.SortBy]: SortBy.PRICE,
        };
      }
      break;
    }
  }

  return { ...params, [paramName]: paramValue };
};

export const isInputFilterCheked = (
  urlParam: URLSearchParams,
  name: string,
  value: string,
) => {
  const splitParam = urlParam.get(name)?.split('-');

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
