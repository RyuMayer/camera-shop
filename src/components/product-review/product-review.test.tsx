import { render, screen } from '@testing-library/react';
import { withRouter, withStore } from '../../utils/mock-component';
import { LoadingStatus } from '../../const';
import { ProductReview } from './product-review';

describe('Component: Product review', () => {
  it('Should render correctly', () => {
    const expectedText = 'Отзывы';
    const { withStoreComponent } = withStore(<ProductReview />, {
      REVIEW: {
        data: [],
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
