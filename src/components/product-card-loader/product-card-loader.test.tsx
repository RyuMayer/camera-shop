import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { ProductCardLoader } from './product-card-loader';
import { makeFakeCameraData } from '../../utils/mocks';

describe('Component: Product card loader', () => {
  it('Should first render correctly', () => {
    const { withStoreComponent } = withStore(<ProductCardLoader />, {
      CAMERA: {
        data: null,
        isLoaded: false,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when data loaded', () => {
    const { withStoreComponent } = withStore(<ProductCardLoader />, {
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('product')).toBeInTheDocument();
  });

  it('Should render correctly when data loading rejected', () => {
    const { withStoreComponent } = withStore(<ProductCardLoader />, {
      CAMERA: {
        data: null,
        isLoaded: false,
        loadingStatus: LoadingStatus.Rejected,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when data loading, but null', () => {
    const { withStoreComponent } = withStore(<ProductCardLoader />, {
      CAMERA: {
        data: null,
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    const { container } = render(preparedComponent);

    expect(container.firstChild).toBeNull();
  });
});
