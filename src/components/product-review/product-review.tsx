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
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { dropPostedStatus } from '../../store/review/review';

export function ProductReview() {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const dispatch = useAppDispatch();

  const isReviewsLoaded = useAppSelector(selectLoadedStatus);
  const isReviewPosted = useAppSelector(selectPostedStatus);

  const handleBtnClick = () => {
    if (isReviewsLoaded) {
      setIsPopupOpened(true);
    }
  };

  const onClose = (state: boolean) => {
    setIsPopupOpened(state);
    dispatch(dropPostedStatus());
  };

  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              onClick={handleBtnClick}
              className="btn"
              type="button"
              disabled={!isReviewsLoaded}
            >
              Оставить свой отзыв
            </button>
          </div>
          <ProductReviewLoader />
        </div>
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
  );
}
