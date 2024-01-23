import { render, screen } from '@testing-library/react';

import { Rating } from './rating';
import { TOTAL_RATING_COUNT } from '../../const';

describe('Component: Rating', () => {
  it('Should render correctly', () => {
    const expectedRating = 3;

    render(<Rating rating={expectedRating} />);
    const visibleRating = screen.getAllByTestId('rating');
    const totalRating = screen.getAllByTestId('icon-full-star');

    expect(visibleRating.length).toBe(TOTAL_RATING_COUNT);
    expect(totalRating.length).toBe(expectedRating);
  });
});
