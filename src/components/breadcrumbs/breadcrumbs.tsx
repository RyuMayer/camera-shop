import { TBreadcrumbsDataList } from '../../types/breadcrumbs';
import { BreadcrumbsLink } from '../breadcrumbs-link/breadcrumbs-link';

type TBreadcrumbsProps = {
  items: TBreadcrumbsDataList[];
};

export function Breadcrumbs({ items }: TBreadcrumbsProps) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {items.map(({ href, title, id }) => (
            <BreadcrumbsLink key={id} linkTo={href}>
              {title}
            </BreadcrumbsLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
