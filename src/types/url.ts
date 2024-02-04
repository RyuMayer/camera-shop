import { PriceUrlParam } from '../components/catalog-filter-price/catalog-filter-price.const';
import { FilterUrlParam } from '../components/catalog-filter/catalog-filter.const';
import { SortUrlParam } from '../components/catalog-sort/catalog-sort.const';

type TUrlParamKeys =
  | (typeof FilterUrlParam)[keyof typeof FilterUrlParam]
  | (typeof SortUrlParam)[keyof typeof SortUrlParam]
  | (typeof PriceUrlParam)[keyof typeof PriceUrlParam];

export type TUrlParams = {
  [K in TUrlParamKeys]?: string;
};
