import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { NotFound } from './not-found';

describe('Component: Not found', () => {
  it('Should render correctly', () => {
    const expectedHeaderText = 'Страница не найдена';
    const expectedBtnText = 'Перейти на главную';
    const { withStoreComponent } = withStore(<NotFound />, {
      CAMERAS: {
        data: [],
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });

    render(withRouter(withStoreComponent));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedBtnText)).toBeInTheDocument();
  });
});
