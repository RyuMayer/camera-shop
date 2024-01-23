import { CatalogFilter } from '../catalog-filter/catalog-filter';
import { CatalogSort } from '../catalog-sort/catalog-sort';
import { CatalogList } from '../catalog-list/catalog-list';
import { CatalogBreadcrumbs } from '../catalog-breadcrumbs/catalog-breadcrumbs';

export function CatalogContent() {
  return (
    <div className="page-content" data-testid="catalog-content">
      <CatalogBreadcrumbs />
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
