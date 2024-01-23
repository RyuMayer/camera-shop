import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openPopup } from '../../store/review/review';
import { ProductReviewList } from '../product-review-list/product-review-list';

export function ProductReview() {
  const dispatch = useAppDispatch();

  const handleBtnClick = () => {
    dispatch(openPopup());
  };

  return (
    <section className="review-block" data-testid="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button onClick={handleBtnClick} className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ProductReviewList />
      </div>
    </section>
  );
}
