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
) => {
  const filterParams: TPriceUrlParams = {};

  const prices = cameras.map((camera) => camera.price);
  const [minPrice, maxPrice] = [Math.min(...prices), Math.max(...prices)];

  for (const key in PriceUrlParam) {
    const sourceKey = PriceUrlParam[key as keyof typeof PriceUrlParam];
    if (sourceKey in sortValues) {
      filterParams[sourceKey] = sortValues[sourceKey];
    }
  }

  const numberMinValueParam = Number(filterParams.minp);
  const numberMaxValueParam = Number(filterParams.maxp);

  return cameras.filter((camera) => {
    if (filterParams.minp && !filterParams.maxp) {
      if (numberMinValueParam && numberMinValueParam < minPrice) {
        return camera.price >= minPrice && camera.price <= maxPrice;
      } else {
        return camera.price >= numberMinValueParam && camera.price <= maxPrice;
      }
    }

    if (!filterParams.minp && filterParams.maxp) {
      if (numberMaxValueParam && numberMaxValueParam > maxPrice) {
        return camera.price <= maxPrice && camera.price >= minPrice;
      } else {
        return camera.price <= numberMaxValueParam && camera.price >= minPrice;
      }
    }

    if (filterParams.minp && filterParams.maxp) {
      if (numberMinValueParam && numberMaxValueParam) {
        if (numberMinValueParam < minPrice && numberMaxValueParam > maxPrice) {
          return camera.price >= minPrice && camera.price <= maxPrice;
        } else {
          return (
            camera.price >= numberMinValueParam &&
            camera.price <= numberMaxValueParam
          );
        }
      }
    }
  });
};
