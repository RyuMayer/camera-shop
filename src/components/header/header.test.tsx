import { render, screen } from '@testing-library/react';

import { Header } from './header';
import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';

describe('Component: Header', () => {
  it('Should render correctly', () => {
    const expectedText = 'Каталог';

    const { withStoreComponent } = withStore(<Header />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: 'idle',
      },
      CART: {
        data: [],
        discountPercent: 0,
        discountСoupon: null,
        discountLoadingStatus: LoadingStatus.Idle,
        isDiscountLoaded: false,
        cartPostingStatus: LoadingStatus.Idle,
        isCartPosted: false,
        isCartSummaryPopupOpened: false,
      },
    });

    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
