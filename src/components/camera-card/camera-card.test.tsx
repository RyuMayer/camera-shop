import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeCameraData } from '../../utils/mocks';
import { CameraCard } from './camera-card';
import { formatPrice } from '../../utils/card';

describe('Component: Camera card', () => {
  it('Should render correctly', () => {
    mockAllIsIntersecting(true);
    const mockData = makeFakeCameraData();
    const { withStoreComponent } = withStore(
      <CameraCard cameraData={mockData} />,
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockData.reviewCount)).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${mockData.rating}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${formatPrice(mockData.price)} ₽`),
    ).toBeInTheDocument();
  });
});
