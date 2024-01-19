import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type TBreadcrumbsLinkProps = {
  children: ReactNode;
  linkTo: (typeof AppRoute)[keyof typeof AppRoute] | null;
};

export function BreadcrumbsLink({ children, linkTo }: TBreadcrumbsLinkProps) {
  return (
    <li className="breadcrumbs__item">
      {linkTo ? (
        <Link className="breadcrumbs__link" to={linkTo}>
          {children}
          <svg width={5} height={8} aria-hidden="true">
            <use xlinkHref="#icon-arrow-mini" />
          </svg>
        </Link>
      ) : (
        <span className="breadcrumbs__link breadcrumbs__link--active">
          {children}
        </span>
      )}
    </li>
  );
}
