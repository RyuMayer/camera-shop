import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import {
  makeFakeCameraData,
  makeFakePromoData,
  makeFakeReviewData,
} from '../../utils/mocks';
import { Product } from './product';
import { LoadingStatus } from '../../const';

describe('Component: Product page', () => {
  it('Should first render correctly', () => {
    mockAllIsIntersecting(true);
    const { withStoreComponent } = withStore(<Product />, {
      CAMERAS: {
        data: [makeFakeCameraData()],
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
      PROMO: {
        data: [makeFakePromoData()],
        isLoaded: true,
        loadingStatus: 'idle',
      },
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
      REVIEW: {
        data: makeFakeReviewData(),
        isLoaded: true,
        isPopupOpened: false,
        isPosted: false,
        loadingStatus: 'idle',
        postingStatus: 'idle',
      },
      SIMILAR: {
        data: [makeFakeCameraData()],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('main-product')).toBeInTheDocument();
  });
});
