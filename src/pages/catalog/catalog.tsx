import { CatalogLoader } from '../../components/catalog-loader/catalog-loader';
import { CatalogSlider } from '../../components/catalog-slider/catalog-slider';

export function Catalog() {
  return (
    <main>
      {/* //TODO: Сделать лоадер! */}
      <CatalogSlider />
      <CatalogLoader />
    </main>
  );
}
