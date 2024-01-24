import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchPromo } from '../../store/promo/promo.action';
import { CatalogSlider } from '../catalog-slider/catalog-slider';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus,
  selectLoadingStatus,
  selectPromos,
} from '../../store/promo/promo.selector';
import { Loading } from '../loading/loading';
import { dropPromoData } from '../../store/promo/promo';

export function CatalogSliderLoader() {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(selectPromos);
  const promosLoadingStatus = useAppSelector(selectLoadingStatus);
  const isPromosLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    dispatch(fetchPromo());

    return () => {
      dispatch(dropPromoData());
    };
  }, [dispatch]);

  return (
    <Loading loadingStatus={promosLoadingStatus} isDataLoaded={isPromosLoaded}>
      {promos.length === 0 ? null : <CatalogSlider promos={promos} />}
    </Loading>
  );
}
