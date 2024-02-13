import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { CartSummary } from './cart-summary';
import { LoadingStatus } from '../../const';
import { TCartItem } from '../../types/cart';

describe('Component: Cart summary', () => {
  const mockData: TCartItem[] = [
    {
      product: makeFakeCameraData(),
      count: 1,
    },
  ];

  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<CartSummary />, {
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

    expect(
      screen.getByText(
        'Если у вас есть промокод на скидку, примените его в этом поле',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });

  it('Should render correctly when data in input', async () => {
    const { withStoreComponent } = withStore(<CartSummary />, {
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

    const expectedInputValue = 'camera-333';

    render(preparedComponent);
    await userEvent.type(screen.getByTestId('promo'), expectedInputValue);

    expect(screen.getByDisplayValue(expectedInputValue)).toBeInTheDocument();
  });
});
