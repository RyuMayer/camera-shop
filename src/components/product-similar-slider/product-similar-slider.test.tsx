import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { ProductSimilarSlider } from './product-similar-slider';
import { LoadingStatus } from '../../const';

describe('Component: Product similar slider', () => {
  beforeAll(() => mockAllIsIntersecting(true));

  it('Should render correctly', () => {
    const mockData = [makeFakeCameraData()];
    const { withStoreComponent } = withStore(
      <ProductSimilarSlider similarCameras={mockData} />,
      {
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
      },
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });
});
