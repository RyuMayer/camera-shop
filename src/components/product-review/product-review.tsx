import { useState } from 'react';

import { ProductReviewList } from '../product-review-list/product-review-list';
import { createPortal } from 'react-dom';
import { Popup } from '../popup/popup';
import { ProductReviewPopup } from '../product-review-popup/product-review-popup';

export function ProductReview() {
  const [isPopupOpened, setIsPopupOpened] = useState(true);

  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              onClick={() => setIsPopupOpened(true)}
              className="btn"
              type="button"
            >
              Оставить свой отзыв
            </button>
          </div>
          <ProductReviewList />
        </div>
      </section>
      {isPopupOpened &&
        createPortal(
          <Popup onClose={setIsPopupOpened}>
            <ProductReviewPopup />
          </Popup>,
          document.querySelector('main') as HTMLElement,
        )}
    </>
  );
}
