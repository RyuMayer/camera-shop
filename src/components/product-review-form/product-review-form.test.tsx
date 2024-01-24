import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRouter, withStore } from '../../utils/mock-component';
import { ProductReviewForm } from './product-review-form';
import { makeFakeCameraData } from '../../utils/mocks';

describe('Component: Product review form', () => {
  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductReviewForm />, {
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });

  it('Should render correctly when data is valid', async () => {
    const { withStoreComponent } = withStore(<ProductReviewForm />, {
      CAMERA: {
        data: makeFakeCameraData(),
        isLoaded: true,
        loadingStatus: 'idle',
      },
    });
    const preparedComponent = withRouter(withStoreComponent);
    const expectedRatingValue = '2';
    const expectedUserNameValue = 'Слава';
    const expectedReviewValue = 'Вот такой вот комментарий';
    const expectedAdvantageValue = 'Много хорошего';
    const expectedDisadvantageValue = 'Мало плохого';

    render(preparedComponent);
    await userEvent.click(screen.getByDisplayValue(expectedRatingValue));
    await userEvent.type(screen.getByTestId('userName'), expectedUserNameValue);
    await userEvent.type(screen.getByTestId('review'), expectedReviewValue);
    await userEvent.type(
      screen.getByTestId('advantage'),
      expectedAdvantageValue,
    );
    await userEvent.type(
      screen.getByTestId('disadvantage'),
      expectedDisadvantageValue,
    );

    expect(screen.getByDisplayValue(expectedRatingValue)).toBeChecked();
    expect(screen.getByDisplayValue(expectedUserNameValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(expectedAdvantageValue),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(expectedDisadvantageValue),
    ).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).not.toBeDisabled();
  });
});
