import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import {
  makeFakeCameraData,
  makeFakePromoData,
  makeFakeReviewData,
} from '../../utils/mocks';
import { Product } from './product';

describe('Component: Product page', () => {
  it('Should first render correctly', () => {
    mockAllIsIntersecting(true);
    const { withStoreComponent } = withStore(<Product />, {
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
