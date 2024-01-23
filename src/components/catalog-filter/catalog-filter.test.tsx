import { render, screen } from '@testing-library/react';
import { CatalogFilter } from './catalog-filter';

describe('Component: Catalog filter', () => {
  it('Should render correctly', () => {
    render(<CatalogFilter />);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Моментальная')).toBeInTheDocument();
    expect(screen.getByText('Любительский')).toBeInTheDocument();
  });
});
