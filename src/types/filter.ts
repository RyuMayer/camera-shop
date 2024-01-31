import { FilterUrlParam } from '../components/catalog-filter/catalog-filter.const';

export type TFilterUrlParams = {
  [K in (typeof FilterUrlParam)[keyof typeof FilterUrlParam]]?: string;
};
