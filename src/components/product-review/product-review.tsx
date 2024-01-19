import { ProductReviewList } from '../product-review-list/product-review-list';

export function ProductReview() {
  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ProductReviewList />
      </div>
    </section>
  );
}
