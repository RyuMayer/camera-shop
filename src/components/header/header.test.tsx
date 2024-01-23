import { render, screen } from '@testing-library/react';

import { Header } from './header';
import { withRouter } from '../../utils/mock-component';

describe('Component: Header', () => {
  it('Should render correctly', () => {
    const expectedText = 'Каталог';
    const preparedComponent = withRouter(<Header />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
