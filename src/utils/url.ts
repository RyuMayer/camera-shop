import { OrderBy, SortBy, SortUrlParam } from '../const';

export const getAllSearchParams = (params: URLSearchParams) => {
  let allParams = {};

  for (const [key, value] of params.entries()) {
    allParams = { ...allParams, [key]: value };
  }

  return allParams;
};

export const isSortKeysValid = (sortValues: { [key: string]: string }) => {
  return Object.values(SortUrlParam).every((key) => key in sortValues);
};

export const isSortUrlParamsValid = (sortValues: { [key: string]: string }) => {
  const isValidSortBy = Object.values(SortBy).some(
    (value) => sortValues[SortUrlParam.SortBy] === value,
  );
  const isValidOrderBy = Object.values(OrderBy).some(
    (value) => sortValues[SortUrlParam.OrderBy] === value,
  );
  const isValidKeys = isSortKeysValid(sortValues);

  return isValidSortBy && isValidOrderBy && isValidKeys;
};
