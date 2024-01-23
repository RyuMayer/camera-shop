import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { CatalogBreadcrumbs } from './catalog-breadcrumbs';

describe('Component: Catalog breadcrumbs', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogBreadcrumbs />);

    render(withRouter(withStoreComponent));

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
