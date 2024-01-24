import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { CatalogSliderLoader } from './catalog-slider-loader';
import { makeFakePromoData } from '../../utils/mocks';

describe('Component: Catalog slider loader', () => {
  it('Should first render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogSliderLoader />, {
      PROMO: {
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
    const { withStoreComponent } = withStore(<CatalogSliderLoader />, {
      PROMO: {
        data: [makeFakePromoData()],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('catalog-slider')).toBeInTheDocument();
  });

  it('Should render correctly when data loading rejected', () => {
    const { withStoreComponent } = withStore(<CatalogSliderLoader />, {
      PROMO: {
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
