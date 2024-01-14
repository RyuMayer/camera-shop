import { CatalogFilter } from '../catalog-filter/catalog-filter';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { CatalogSort } from '../catalog-sort/catalog-sort';
import { CatalogList } from '../catalog-list/catalog-list';

export function CatalogContent() {
  return (
    <div className="page-content">
      <Breadcrumbs />
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <div className="catalog__aside">
              <CatalogFilter />
            </div>
            <div className="catalog__content">
              <CatalogSort />
              <CatalogList />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
