import { render, screen } from '@testing-library/react';
import { Search } from './search';
import { withRouter, withStore } from '../../utils/mock-component';

describe('Component: Search', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<Search />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const withRouterComponent = withRouter(withStoreComponent);

    render(withRouterComponent);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
