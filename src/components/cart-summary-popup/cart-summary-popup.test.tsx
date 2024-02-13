import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { CartSummaryPopup } from './cart-summary-popup';
import { LoadingStatus } from '../../const';

describe('Component: Cart summary popup', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(
      <CartSummaryPopup onClose={() => null} />,
      {
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
      },
    );

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });
});
