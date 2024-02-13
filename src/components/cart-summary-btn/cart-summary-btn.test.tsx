import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { LoadingStatus } from '../../const';
import { TCartItem } from '../../types/cart';
import { CartSummaryBtn } from './cart-summary-btn';

describe('Component: Cart summary btn', () => {
  const mockData: TCartItem[] = [
    {
      product: makeFakeCameraData(),
      count: 1,
    },
  ];

  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<CartSummaryBtn />, {
      CART: {
        data: mockData,
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

    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });
});
