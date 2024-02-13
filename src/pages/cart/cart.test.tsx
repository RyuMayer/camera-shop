import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { Cart } from './cart';

describe('Component: Cart page', () => {
  it('Should first render correctly', () => {
    const { withStoreComponent } = withStore(<Cart />, {
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

    expect(screen.getByTestId('basket')).toBeInTheDocument();
    expect(screen.getAllByText('Корзина').length).toBe(2);
  });
});
