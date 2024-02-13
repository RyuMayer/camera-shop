import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { LoadingStatus } from '../../const';
import { CartList } from './cart-list';
import { TCartItem } from '../../types/cart';

describe('Component: Cart list', () => {
  beforeAll(() => mockAllIsIntersecting(true));

  const mockData: TCartItem[] = [
    {
      product: makeFakeCameraData(),
      count: 1,
    },
  ];

  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<CartList items={mockData} />, {
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

    expect(screen.getAllByTestId('basket-item').length).toBe(1);
  });
});
