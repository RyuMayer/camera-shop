import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withRouter, withStore } from '../../utils/mock-component';
import { CatalogFilterPrice } from './catalog-filter-price';
import { makeFakeCameraData } from '../../utils/mocks';

describe('Component: Catalog filter price', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogFilterPrice />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const withRouterComponent = withRouter(withStoreComponent);

    render(withRouterComponent);

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });

  it('Should render correctly when input data', async () => {
    const { withStoreComponent } = withStore(<CatalogFilterPrice />, {
      CAMERAS: {
        data: [
          { ...makeFakeCameraData(), price: 10000 },
          { ...makeFakeCameraData(), price: 20000 },
        ],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const withRouterComponent = withRouter(withStoreComponent);
    const expectedMinValue = '10000';
    const expectedMaxValue = '20000';

    render(withRouterComponent);
    await userEvent.type(screen.getByTestId('input-min'), expectedMinValue);
    await userEvent.type(screen.getByTestId('input-max'), expectedMaxValue);

    screen.debug();

    expect(screen.getByDisplayValue(expectedMinValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedMaxValue)).toBeInTheDocument();
  });
});
