import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withStore } from '../../utils/mock-component';
import { makeFakeReviewData } from '../../utils/mocks';
import { ProductReviewList } from './product-review-list';
import { LoadingStatus } from '../../const';

describe('Component: Product review list', () => {
  it('Should render correctly when reviews = 1', () => {
    const mockData = makeFakeReviewData();
    const { withStoreComponent } = withStore(<ProductReviewList />, {
      REVIEW: {
        data: mockData.slice(0, 1),
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
    });

    render(withStoreComponent);

    expect(screen.getAllByTestId('review-card').length).toBe(1);
    expect(
      screen.queryByText('Показать больше отзывов'),
    ).not.toBeInTheDocument();
  });

  it('Should render correctly when reviews = 3', () => {
    const mockData = makeFakeReviewData();
    const { withStoreComponent } = withStore(<ProductReviewList />, {
      REVIEW: {
        data: mockData.slice(0, 3),
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
    });

    render(withStoreComponent);

    expect(screen.getAllByTestId('review-card').length).toBe(3);
    expect(
      screen.queryByText('Показать больше отзывов'),
    ).not.toBeInTheDocument();
  });

  it('Should render correctly when reviews = 5', () => {
    const mockData = makeFakeReviewData();
    const { withStoreComponent } = withStore(<ProductReviewList />, {
      REVIEW: {
        data: mockData.slice(0, 5),
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
    });

    render(withStoreComponent);

    expect(screen.getAllByTestId('review-card').length).toBe(3);
    expect(screen.queryByText('Показать больше отзывов')).toBeInTheDocument();
  });

  it('Should load more review button enable and displays three more comments when reviews = 6', async () => {
    const mockData = [...makeFakeReviewData(), ...makeFakeReviewData()];
    const { withStoreComponent } = withStore(<ProductReviewList />, {
      REVIEW: {
        data: mockData.slice(0, 6),
        isLoaded: true,
        loadingStatus: LoadingStatus.Idle,
        isPopupOpened: false,
        isPosted: false,
        postingStatus: 'idle',
      },
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByText('Показать больше отзывов'));

    expect(screen.getAllByTestId('review-card').length).toBe(6);
    expect(
      screen.queryByText('Показать больше отзывов'),
    ).not.toBeInTheDocument();
  });
});
