import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { makeFakeCameraData } from '../../utils/mocks';
import { ProductSimilarLoader } from './product-similar-loader';

describe('Component: Product similar loader', () => {
  beforeAll(() => mockAllIsIntersecting(true));

  it('Should first render correctly', () => {
    const { withStoreComponent } = withStore(<ProductSimilarLoader />, {
      SIMILAR: {
        data: [],
        isLoaded: false,
        loadingStatus: LoadingStatus.Idle,
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
    const { withStoreComponent } = withStore(<ProductSimilarLoader />, {
      SIMILAR: {
        data: [makeFakeCameraData()],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('product-similar')).toBeInTheDocument();
  });

  it('Should render correctly when data loading rejected', () => {
    const { withStoreComponent } = withStore(<ProductSimilarLoader />, {
      SIMILAR: {
        data: [],
        isLoaded: false,
        loadingStatus: LoadingStatus.Rejected,
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

  it('Should render correctly when data loading, length === 0', () => {
    const { withStoreComponent } = withStore(<ProductSimilarLoader />, {
      SIMILAR: {
        data: [],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    const { container } = render(preparedComponent);

    expect(container.firstChild).toBeNull();
  });
});
