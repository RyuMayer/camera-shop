import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { formatPrice } from '../../utils/card';
import { CartItem } from './cart-item';

describe('Component: Cart item', () => {
  it('Should render correctly', () => {
    mockAllIsIntersecting(true);
    const mockData = makeFakeCameraData();
    const { withStoreComponent } = withStore(
      <CartItem product={mockData} numberInCart={2} />,
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByText(`${formatPrice(mockData.price)} ₽`),
    ).toBeInTheDocument();
    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
    expect(screen.getByText(`${mockData.level} уровень`)).toBeInTheDocument();
  });
});
