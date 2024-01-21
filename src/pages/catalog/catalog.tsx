import { CatalogLoader } from '../../components/catalog-loader/catalog-loader';
import { CatalogSliderLoader } from '../../components/catalog-slider-loader/catalog-slider-loader';

export function Catalog() {
  return (
    <main>
      <CatalogSliderLoader />
      <CatalogLoader />
    </main>
  );
}
