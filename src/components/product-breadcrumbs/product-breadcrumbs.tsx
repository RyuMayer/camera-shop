import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectCameraName } from '../../store/camera/camera.selector';
import { TBreadcrumbsDataList } from '../../types/breadcrumbs';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

export function ProductBreadcrumbs() {
  const cameraName = useAppSelector(selectCameraName);

  const productBreadcrumbs: TBreadcrumbsDataList[] = [
    {
      id: 1,
      title: 'Главная',
      href: AppRoute.Catalog,
    },
    {
      id: 2,
      title: 'Каталог',
      href: AppRoute.Catalog,
    },
    {
      id: 3,
      title: cameraName ? cameraName : '...',
      href: null,
    },
  ];

  return <Breadcrumbs items={productBreadcrumbs} />;
}
