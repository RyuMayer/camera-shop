import { FilterUrlParam } from '../components/catalog-filter/catalog-filter.const';
import { SortUrlParam } from '../const';

type TUrlParamKeys =
  | (typeof FilterUrlParam)[keyof typeof FilterUrlParam]
  | (typeof SortUrlParam)[keyof typeof SortUrlParam];

export type TUrlParams = {
  [K in TUrlParamKeys]?: string;
};
