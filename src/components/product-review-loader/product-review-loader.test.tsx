import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { makeFakeCameraData } from '../../utils/mocks';
import { ProductReviewLoader } from './product-review-loader';

describe('Component: Product review loader', () => {
  it('Should first render correctly', () => {
    const { withStoreComponent } = withStore(<ProductReviewLoader />, {
      REVIEW: {
        data: [],
        isLoaded: false,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when data loaded', () => {
    const { withStoreComponent } = withStore(<ProductReviewLoader />, {
      REVIEW: {
        data: [],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('review-block')).toBeInTheDocument();
  });

  it('Should render correctly when data loading rejected', () => {
    const { withStoreComponent } = withStore(<ProductReviewLoader />, {
      REVIEW: {
        data: [],
        isLoaded: false,
        loadingStatus: LoadingStatus.Rejected,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
