import { Helmet } from 'react-helmet-async';

import { CatalogLoader } from '../../components/catalog-loader/catalog-loader';
import { CatalogSliderLoader } from '../../components/catalog-slider-loader/catalog-slider-loader';

export function Catalog() {
  return (
    <main data-testid="main-catalog">
      <Helmet>
        <title>Главная странциа</title>
      </Helmet>
      <CatalogSliderLoader />
      <CatalogLoader />
    </main>
  );
}
