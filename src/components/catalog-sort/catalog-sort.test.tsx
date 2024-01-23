import { render, screen } from '@testing-library/react';
import { CatalogSort } from './catalog-sort';

describe('Component: Catalog sort', () => {
  it('Should render correctly', () => {
    render(<CatalogSort />);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
