<<<<<<< HEAD
=======
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Popup } from '../popup/popup';
import { ProductReviewPopup } from '../product-review-popup/product-review-popup';
import { ProductReviewLoader } from '../product-review-loader/product-review-loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus,
  selectPostedStatus,
} from '../../store/review/similar.selector';
import { PopupSuccess } from '../popup-success/popup-success';
>>>>>>> 53fb3eb2ba81d429d14c32d2fdf4e2515c48a2fa
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openPopup } from '../../store/review/review';
import { ProductReviewList } from '../product-review-list/product-review-list';

export function ProductReview() {
  const dispatch = useAppDispatch();

  const handleBtnClick = () => {
    dispatch(openPopup());
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button onClick={handleBtnClick} className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
<<<<<<< HEAD
        <ProductReviewList />
      </div>
    </section>
=======
      </section>
      {isPopupOpened &&
        createPortal(
          <Popup onClose={onClose} isNarrow={isReviewPosted}>
            {isReviewPosted ? (
              <PopupSuccess onClose={onClose} />
            ) : (
              <ProductReviewPopup />
            )}
          </Popup>,
          document.querySelector('main') as HTMLElement,
        )}
    </>
>>>>>>> 53fb3eb2ba81d429d14c32d2fdf4e2515c48a2fa
  );
}
