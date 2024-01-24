import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData, makeFakePromoData } from '../../utils/mocks';
import { Catalog } from './catalog';

describe('Component: Catalog page', () => {
  it('Should first render correctly', () => {
    mockAllIsIntersecting(true);
    const { withStoreComponent } = withStore(<Catalog />, {
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
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('main-catalog')).toBeInTheDocument();
  });
});
