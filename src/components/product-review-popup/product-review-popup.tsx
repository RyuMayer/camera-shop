import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectOpenedStatus,
  selectPostedStatus,
} from '../../store/review/review.selector';
import { ProductReviewForm } from '../product-review-form/product-review-form';
import { PopupSuccess } from '../popup-success/popup-success';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { closePopup, dropPostedStatus } from '../../store/review/review';
import { Modal } from '../modal/modal';

export function ProductReviewPopup() {
  const dispatch = useAppDispatch();

  const isPopupOpened = useAppSelector(selectOpenedStatus);
  const isReviewPosted = useAppSelector(selectPostedStatus);

  const onClose = () => {
    dispatch(closePopup());
    dispatch(dropPostedStatus());
  };

  return (
    <Modal onClose={onClose} isOpen={isPopupOpened} isNarrow={isReviewPosted}>
      {isReviewPosted ? (
        <PopupSuccess onClose={onClose} />
      ) : (
        <ProductReviewForm />
      )}
    </Modal>
  );
}
