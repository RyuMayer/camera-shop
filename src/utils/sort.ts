import {
  OrderBy,
  SortBy,
  SortUrlParam,
} from '../components/catalog-sort/catalog-sort.const';
import { TCamera } from '../types/camera';
import { TReview } from '../types/review';
import { TUrlParams } from '../types/url';
import { getAllSearchParams } from './url';

export const sortByCreationDate = (a: TReview, b: TReview) => {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
};

export const sortBy = {
  [`${SortBy.PRICE}${OrderBy.ASC}`]: (a: TCamera, b: TCamera) =>
    a.price - b.price,
  [`${SortBy.PRICE}${OrderBy.DESC}`]: (a: TCamera, b: TCamera) =>
    b.price - a.price,
  [`${SortBy.POPULARITY}${OrderBy.ASC}`]: (a: TCamera, b: TCamera) =>
    a.rating !== b.rating ? a.rating - b.rating : a.reviewCount - b.reviewCount,
  [`${SortBy.POPULARITY}${OrderBy.DESC}`]: (a: TCamera, b: TCamera) =>
    a.rating !== b.rating ? b.rating - a.rating : b.reviewCount - a.reviewCount,
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

export const isSortUrlParamsValid = (sortValues: TUrlParams) => {
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
