import {
  CategoryFilterLocalized,
  FilterUrlParam,
  LevelFilterLocalized,
  TypeFilterLocalized,
} from '../components/catalog-filter/catalog-filter.const';
import { TCamera } from '../types/camera';
import { TFilterUrlParams } from '../types/filter';
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
      const filterParamValue = filterParams[key as keyof TFilterUrlParams];
      if (filterParamValue) {
        const values = filterParamValue.split('-').map((value) => {
          if (key === 'category' && value in CategoryFilterLocalized)
            return CategoryFilterLocalized[
              value as keyof typeof CategoryFilterLocalized
            ];
          if (key === 'type' && value in TypeFilterLocalized)
            return TypeFilterLocalized[
              value as keyof typeof TypeFilterLocalized
            ];
          if (key === 'level' && value in LevelFilterLocalized)
            return LevelFilterLocalized[
              value as keyof typeof LevelFilterLocalized
            ];
        });

        if (
          !values.some(
            (filterValue) => filterValue === item[key as keyof TCamera],
          )
        ) {
          return false;
        }
      }
    }
    return true;
  });
};
