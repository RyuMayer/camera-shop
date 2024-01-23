import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { CatalogSlider } from './catalog-slider';
import { makeFakePromoData } from '../../utils/mocks';

describe('Component: Catalog slider', () => {
  beforeAll(() => mockAllIsIntersecting(true));

  it('Should render correctly', () => {
    const mockData = [makeFakePromoData()];
    const { withStoreComponent } = withStore(<CatalogSlider />, {
      PROMO: {
        data: mockData,
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(
      screen.getByText('Профессиональная камера от известного производителя'),
    ).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
