import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { ProductTabs } from './product-tabs';

describe('Component: Product tabs', () => {
  it('Should render correctly', () => {
    const mockData = makeFakeCameraData();
    const { withStoreComponent } = withStore(<ProductTabs camera={mockData} />);
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);
    screen.debug();

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText(mockData.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockData.category)).toBeInTheDocument();
    expect(screen.getByText(mockData.type)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
  });
});
