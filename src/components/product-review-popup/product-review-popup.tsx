import { createPortal } from 'react-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectOpenedStatus,
  selectPostedStatus,
} from '../../store/review/review.selector';
import { Popup } from '../popup/popup';
import { ProductReviewForm } from '../product-review-form/product-review-form';
import { PopupSuccess } from '../popup-success/popup-success';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { closePopup, dropPostedStatus } from '../../store/review/review';

export function ProductReviewPopup() {
  const dispatch = useAppDispatch();

  const isPopupOpened = useAppSelector(selectOpenedStatus);
  const isReviewPosted = useAppSelector(selectPostedStatus);

  const onClose = () => {
    dispatch(closePopup());
    dispatch(dropPostedStatus());
  };

  return isPopupOpened
    ? createPortal(
        <Popup onClose={onClose} isNarrow={isReviewPosted}>
          {isReviewPosted ? (
            <PopupSuccess onClose={onClose} />
          ) : (
            <ProductReviewForm />
          )}
        </Popup>,
        document.querySelector('main') as HTMLElement,
      )
    : null;
}
