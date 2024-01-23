import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { formatPrice } from '../../utils/card';
import { ProductCard } from './product-card';

describe('Component: Product card', () => {
  it('Should render correctly', () => {
    const mockData = makeFakeCameraData();
    const { withStoreComponent } = withStore(<ProductCard data={mockData} />);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockData.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${mockData.rating}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${formatPrice(mockData.price)} ₽`),
    ).toBeInTheDocument();
  });
});
