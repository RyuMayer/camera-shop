import { PriceUrlParam } from '../components/catalog-filter-price/catalog-filter-price.const';
import { FilterUrlParam } from '../components/catalog-filter/catalog-filter.const';

export type TFilterUrlParams = {
  [K in (typeof FilterUrlParam)[keyof typeof FilterUrlParam]]?: string;
};

export type TPriceUrlParams = {
  [K in (typeof PriceUrlParam)[keyof typeof PriceUrlParam]]?: string;
};
