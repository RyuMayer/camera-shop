import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { CatalogList } from './catalog-list';
import { CARDS_PER_PAGE, LoadingStatus } from '../../const';

describe('Component: Catalog list', () => {
  beforeAll(() => mockAllIsIntersecting(true));

  it('Should render correctly without pagination', () => {
    const { withStoreComponent } = withStore(<CatalogList />, {
      CAMERAS: {
        data: [makeFakeCameraData()],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
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

    expect(screen.getAllByTestId('camera-card').length).toBe(1);
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('Should render correctly with pagination', () => {
    const { withStoreComponent } = withStore(<CatalogList />, {
      CAMERAS: {
        data: Array.from({ length: 18 }, () => makeFakeCameraData()),
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
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

    expect(screen.getAllByTestId('camera-card').length).toBe(CARDS_PER_PAGE);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('Should render correctly with empty data', () => {
    const { withStoreComponent } = withStore(<CatalogList />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByText('По вашему запросу ничего не найдено.'),
    ).toBeInTheDocument();
  });
});
