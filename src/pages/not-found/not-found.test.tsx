import { render, screen } from '@testing-library/react';

import { withRouter } from '../../utils/mock-component';
import { NotFound } from './not-found';

describe('Component: Not found', () => {
  it('Should render correctly', () => {
    const expectedHeaderText = 'Страница не найдена';
    const expectedBtnText = 'Перейти на главную';

    render(withRouter(<NotFound />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedBtnText)).toBeInTheDocument();
  });
});
