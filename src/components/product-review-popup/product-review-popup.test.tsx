// import { render, screen } from '@testing-library/react';

// import { withRouter, withStore } from '../../utils/mock-component';
// import { LoadingStatus } from '../../const';
// import { ProductReviewPopup } from './product-review-popup';

// describe('Component: Product review popup', () => {
//   it('Should render correctly when popup opened and review posted', () => {
//     const { withStoreComponent } = withStore(<ProductReviewPopup />, {
//       REVIEW: {
//         data: [],
//         isLoaded: false,
//         loadingStatus: LoadingStatus.Idle,
//         isPopupOpened: true,
//         isPosted: true,
//         postingStatus: 'idle',
//       },
//     });
//     const preparedComponent = withRouter(withStoreComponent);

//     const { rerender } = render(preparedComponent);
//     console.log(rerender);

//     expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
//     expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
//   });
// });
