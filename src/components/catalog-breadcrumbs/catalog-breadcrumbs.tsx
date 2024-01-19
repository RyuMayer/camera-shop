import { AppRoute } from '../../const';
import { TBreadcrumbsDataList } from '../../types/breadcrumbs';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

export function CatalogBreadcrumbs() {
  const catalogBreadcrumbs: TBreadcrumbsDataList[] = [
    {
      id: 1,
      title: 'Главная',
      href: AppRoute.Catalog,
    },
    {
      id: 2,
      title: 'Каталог',
      href: null,
    },
  ];

  return <Breadcrumbs items={catalogBreadcrumbs} />;
}
