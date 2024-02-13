import { MouseEvent } from 'react';
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

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    onClose();
  };

  return (
    <>
      <p className="title title--h4">{title}</p>
      <div className="modal__buttons">
        <Link
          to={AppRoute.Catalog}
          className="btn btn--transparent modal__btn--fit-width"
        >
          Продолжить покупки
        </Link>
        <a
          onClick={handleLinkClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          href="#"
        >
          Перейти в корзину
        </a>
      </div>
    </>
  );
}
