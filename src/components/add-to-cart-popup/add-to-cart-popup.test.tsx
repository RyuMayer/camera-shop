import { render, screen } from '@testing-library/react';

import { withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { AddToCartPopup } from './add-to-cart-popup';

describe('Component: Add to cart popup', () => {
  it('Should render correctly', () => {
    const mockData = makeFakeCameraData();
    const { withStoreComponent } = withStore(
      <AddToCartPopup onAddedSuccess={() => null} data={mockData} />,
    );

    render(withStoreComponent);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText(mockData.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
