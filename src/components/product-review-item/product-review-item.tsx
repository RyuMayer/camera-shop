import { memo } from 'react';
import { TReview } from '../../types/review';
import { humanizeDateTime, humanizeReviewDate } from '../../utils/date-time';
import { Rating } from '../rating/rating';

type TProductReviewItemProps = {
  review: TReview;
};

function ProductReviewItem({ review }: TProductReviewItemProps) {
  return (
    <li className="review-card" data-testid="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time
          className="review-card__data"
          dateTime={humanizeDateTime(review.createAt)}
        >
          {humanizeReviewDate(review.createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        <Rating rating={review.rating} />
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

const ProductReviewItemMemo = memo(ProductReviewItem);
export { ProductReviewItemMemo };
