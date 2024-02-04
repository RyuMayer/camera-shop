import { render, screen } from '@testing-library/react';
import { CatalogSort } from './catalog-sort';
import { withRouter } from '../../utils/mock-component';

describe('Component: Catalog sort', () => {
  it('Should render correctly', () => {
    const componentWithRouter = withRouter(<CatalogSort />);

    render(componentWithRouter);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
