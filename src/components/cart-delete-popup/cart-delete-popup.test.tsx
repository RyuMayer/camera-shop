import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { CartDeletePopup } from './cart-delete-popup';
import { makeFakeCameraData } from '../../utils/mocks';

describe('Component: Cart delete popup', () => {
  it('Should render correctly', () => {
    const mockData = makeFakeCameraData();
    const { withStoreComponent } = withStore(
      <CartDeletePopup onClose={() => null} product={mockData} />,
    );

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText(mockData.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});
