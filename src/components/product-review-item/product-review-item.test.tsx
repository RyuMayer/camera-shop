import { render, screen } from '@testing-library/react';

import { withRouter, withStore } from '../../utils/mock-component';
import { makeFakeReviewData } from '../../utils/mocks';
import { ProductReviewItemMemo } from './product-review-item';

describe('Component: Product review item', () => {
  it('Should render correctly', () => {
    const mockData = makeFakeReviewData()[0];
    const { withStoreComponent } = withStore(
      <ProductReviewItemMemo review={mockData} />,
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockData.userName)).toBeInTheDocument();
    expect(screen.getByText(mockData.advantage)).toBeInTheDocument();
    expect(screen.getByText(mockData.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(mockData.review)).toBeInTheDocument();
  });
});
