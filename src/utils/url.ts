import {
  CategoryFilter,
  FilterUrlParam,
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
  // const isValidSortBy = Object.values(SortBy).some(
  //   (value) => sortValues[SortUrlParam.SortBy] === value,
  // );
  // const isValidOrderBy = Object.values(OrderBy).some(
  //   (value) => sortValues[SortUrlParam.OrderBy] === value,
  // );
  // const isValidKeys = Object.values(SortUrlParam).every(
  //   (key) => key in sortValues,
  // );

  // return isValidSortBy && isValidOrderBy && isValidKeys;

  const isValidCategory = Object.values(CategoryFilter).some(
    (value) => sortValues[FilterUrlParam.Category] === value,
  );

  return isValidCategory;
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

  return Boolean(splitParam && splitParam.includes(value));
};
