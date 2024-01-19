import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Loading } from '../loading/loading';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus,
  selectLoadingStatus,
} from '../../store/similar/similar.selector';
import { ProductSimilar } from '../product-similar/product-similar';
import { fetchSimilar } from '../../store/similar/similar.action';

export function ProductSimilarLoader() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const similarLoadingStatus = useAppSelector(selectLoadingStatus);
  const isSimilarLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    if (productId) {
      dispatch(fetchSimilar(Number(productId)));
    }
  }, [dispatch, productId]);

  return (
    <Loading
      loadingStatus={similarLoadingStatus}
      isDataLoaded={isSimilarLoaded}
    >
      <ProductSimilar />
    </Loading>
  );
}
