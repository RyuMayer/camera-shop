import { render, screen } from '@testing-library/react';

import { Header } from './header';
import { withRouter, withStore } from '../../utils/mock-component';

describe('Component: Header', () => {
  it('Should render correctly', () => {
    const expectedText = 'Каталог';

    const { withStoreComponent } = withStore(<Header />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });

    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
