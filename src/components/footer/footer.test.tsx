import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Component: footer', () => {
  it('Should render correctly', () => {
    const expectedText = /Интернет-магазин фото- и видеотехники/i;

    render(<Footer />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
