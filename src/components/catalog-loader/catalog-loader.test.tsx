import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { CatalogLoader } from './catalog-loader';
import { LoadingStatus } from '../../const';

describe('Component: Catalog loader', () => {
  beforeAll(() => mockAllIsIntersecting(true));

  it('Should first render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogLoader />, {
      CAMERAS: {
        data: [],
        isLoaded: false,
        loadingStatus: LoadingStatus.Loading,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('Should render correctly when data loaded', () => {
    const { withStoreComponent } = withStore(<CatalogLoader />, {
      CAMERAS: {
        data: [makeFakeCameraData()],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });

  it('Should render correctly when data loading rejected', () => {
    const { withStoreComponent } = withStore(<CatalogLoader />, {
      CAMERAS: {
        data: [],
        isLoaded: false,
        loadingStatus: LoadingStatus.Rejected,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
