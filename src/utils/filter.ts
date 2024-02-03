import { PriceUrlParam } from '../components/catalog-filter-price/catalog-filter-price.const';
import {
  CategoryFilterLocalized,
  FilterUrlParam,
  LevelFilterLocalized,
  TypeFilterLocalized,
  ValidFilter,
} from '../components/catalog-filter/catalog-filter.const';
import { TCamera } from '../types/camera';
import { TFilterUrlParams, TPriceUrlParams } from '../types/filter';
import { TUrlParams } from '../types/url';

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
        const currentValues = filterValue.split('-');

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
  minPrice: number,
  maxPrice: number,
) => {
  const filterParams: TPriceUrlParams = {};

  for (const key in PriceUrlParam) {
    const sourceKey = PriceUrlParam[key as keyof typeof PriceUrlParam];
    if (sourceKey in sortValues) {
      filterParams[sourceKey] = sortValues[sourceKey];
    }
  }

  return cameras.filter((camera) => {
    if (
      filterParams.minp &&
      !filterParams.maxp &&
      Number(filterParams.minp) >= minPrice &&
      Number(filterParams.minp) <= maxPrice
    ) {
      console.log('1 if');
      return camera.price >= Number(filterParams.minp);
    }

    if (
      !filterParams.minp &&
      filterParams.maxp &&
      Number(filterParams.maxp) >= minPrice &&
      Number(filterParams.maxp) <= maxPrice
    ) {
      console.log('2 if');
      return camera.price <= Number(filterParams.maxp);
    }

    if (
      filterParams.minp &&
      filterParams.maxp &&
      Number(filterParams.maxp) >= minPrice &&
      Number(filterParams.maxp) <= maxPrice &&
      Number(filterParams.minp) >= minPrice &&
      Number(filterParams.minp) <= maxPrice
    ) {
      console.log('3 if');
      return (
        camera.price >= Number(filterParams.minp) &&
        camera.price <= Number(filterParams.maxp)
      );
    }
  });
};
