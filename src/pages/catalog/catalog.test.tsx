import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData, makeFakePromoData } from '../../utils/mocks';
import { Catalog } from './catalog';
import { LoadingStatus } from '../../const';

describe('Component: Catalog page', () => {
  it('Should first render correctly', () => {
    mockAllIsIntersecting(true);
    const { withStoreComponent } = withStore(<Catalog />, {
      CAMERAS: {
        data: [makeFakeCameraData()],
        isLoaded: true,
        loadingStatus: 'idle',
      },
      PROMO: {
        data: [makeFakePromoData()],
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

    expect(screen.getByTestId('main-catalog')).toBeInTheDocument();
  });
});
