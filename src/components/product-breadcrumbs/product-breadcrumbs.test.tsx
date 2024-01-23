import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { ProductBreadcrumbs } from './product--breadcrumbs';
import { makeFakeCameraData } from '../../utils/mocks';

describe('Component: Catalog breadcrumbs', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductBreadcrumbs />, {
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });

    render(withRouter(withStoreComponent));

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
