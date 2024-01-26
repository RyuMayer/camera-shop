import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchPromo } from '../../store/promo/promo.action';
import { CatalogSlider } from '../catalog-slider/catalog-slider';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectLoadedStatus,
  selectLoadingStatus,
  selectPromos,
} from '../../store/promo/promo.selector';
import { Loader } from '../loader/loader';
import { dropPromoData } from '../../store/promo/promo';

export function CatalogSliderLoader() {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(selectPromos);
  const promosLoadingStatus = useAppSelector(selectLoadingStatus);
  const isPromosLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) dispatch(fetchPromo());

    return () => {
      dispatch(dropPromoData());
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <Loader loadingStatus={promosLoadingStatus} isDataLoaded={isPromosLoaded}>
      {promos.length !== 0 && <CatalogSlider promos={promos} />}
    </Loader>
  );
}
