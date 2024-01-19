import { useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectSortedReviews } from '../../store/review/similar.selector';
import { ProductReviewItemMemo } from '../product-review-item/product-review-item';
import { COUNT_REVIEWS_FOR_RENDER } from '../../const';

export function ProductReviewList() {
  const reviews = useAppSelector(selectSortedReviews);
  const [countTotalReviewsForRender, setCountTotalReviewsForRender] = useState(
    COUNT_REVIEWS_FOR_RENDER,
  );

  const isAllReviewsRendered = reviews.length <= countTotalReviewsForRender;

  const handleReviewBtnClick = () => {
    setCountTotalReviewsForRender(
      (prevValue) => prevValue + COUNT_REVIEWS_FOR_RENDER,
    );
  };

  return reviews.length !== 0 ? (
    <>
      <ul className="review-block__list">
        {reviews.slice(0, countTotalReviewsForRender).map((review) => (
          <ProductReviewItemMemo key={review.id} review={review} />
        ))}
      </ul>
      {isAllReviewsRendered || (
        <div className="review-block__buttons">
          <button
            onClick={handleReviewBtnClick}
            className="btn btn--purple"
            type="button"
          >
            Показать больше отзывов
          </button>
        </div>
      )}
    </>
  ) : (
    'Список отзывов пуст'
  );
}
