import { Link } from 'react-router-dom';

import { AppRoute, LoadingStatus } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectCartPostingStatus,
  selectIsCartPosted,
} from '../../store/cart/cart.selector';

type TCartSummaryPopupProps = {
  onClose: (state?: boolean) => void;
};

export function CartSummaryPopup({ onClose }: TCartSummaryPopupProps) {
  const cartPostingStatus = useAppSelector(selectCartPostingStatus);
  const isCartPosted = useAppSelector(selectIsCartPosted);

  const title =
    cartPostingStatus !== LoadingStatus.Rejected && isCartPosted
      ? 'Спасибо за покупку'
      : 'Произошла ошибка при отправке данных';

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <p className="title title--h4">{title}</p>
      {cartPostingStatus !== LoadingStatus.Rejected && (
        <svg className="modal__icon" width="80" height="78" aria-hidden="true">
          <use xlinkHref="#icon-review-success"></use>
        </svg>
      )}
      <div className="modal__buttons">
        <Link
          to={AppRoute.Catalog}
          onClick={handleLinkClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </Link>
      </div>
    </>
  );
}
