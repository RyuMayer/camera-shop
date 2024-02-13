import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { AddToCartSuccessPopup } from './add-to-cart-success-popup';

describe('Component: Add to cart success popup', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(
      <AddToCartSuccessPopup onClose={() => null} />,
    );

    render(withRouter(withStoreComponent));

    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    expect(
      screen.getByText('Товар успешно добавлен в корзину'),
    ).toBeInTheDocument();
  });
});
