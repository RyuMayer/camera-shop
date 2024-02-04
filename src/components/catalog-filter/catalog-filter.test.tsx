import { render, screen } from '@testing-library/react';
import { CatalogFilter } from './catalog-filter';
import { withRouter, withStore } from '../../utils/mock-component';

describe('Component: Catalog filter', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogFilter />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const withRouterComponent = withRouter(withStoreComponent);

    render(withRouterComponent);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Моментальная')).toBeInTheDocument();
    expect(screen.getByText('Любительский')).toBeInTheDocument();
  });
});
