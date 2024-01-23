import { render, screen } from '@testing-library/react';

import { withRouter } from '../../utils/mock-component';
import { BreadcrumbsLink } from './breadcrumbs-link';

describe('Component: Breadcrumbs link', () => {
  it('Should render correctly with link', () => {
    render(
      withRouter(
        <BreadcrumbsLink linkTo={'/product'}>Главная</BreadcrumbsLink>,
      ),
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });

  it('Should render correctly without link', () => {
    render(
      withRouter(<BreadcrumbsLink linkTo={null}>Главная</BreadcrumbsLink>),
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });
});
