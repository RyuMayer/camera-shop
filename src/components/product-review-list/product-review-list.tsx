import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectSortedReviews } from '../../store/review/review.selector';
import { ProductReviewItemMemo } from '../product-review-item/product-review-item';
import { COUNT_REVIEWS_FOR_RENDER } from '../../const';

export function ProductReviewList() {
  const reviews = useAppSelector(selectSortedReviews);
  const { ref, inView } = useInView({ threshold: 1 });

  const [countTotalReviewsForRender, setCountTotalReviewsForRender] = useState(
    COUNT_REVIEWS_FOR_RENDER,
  );

  const isAllReviewsRendered = reviews.length <= countTotalReviewsForRender;

  const handleReviewBtnClick = useCallback(() => {
    if (!isAllReviewsRendered) {
      setCountTotalReviewsForRender(
        (prevValue) => prevValue + COUNT_REVIEWS_FOR_RENDER,
      );
    }
  }, [isAllReviewsRendered]);

  useEffect(() => {
    if (inView) handleReviewBtnClick();
  }, [handleReviewBtnClick, inView]);

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
            ref={ref}
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
