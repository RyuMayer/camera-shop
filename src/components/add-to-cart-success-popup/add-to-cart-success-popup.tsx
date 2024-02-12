import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type TAddToCartSuccessPopupProps = {
  onClose: (state?: boolean) => void;
};

export function AddToCartSuccessPopup({
  onClose,
}: TAddToCartSuccessPopupProps) {
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    onClose();
  };

  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <a
          onClick={handleLinkClick}
          className="btn btn--transparent modal__btn"
          href="#"
        >
          Продолжить покупки
        </a>
        <Link
          to={AppRoute.Cart}
          className="btn btn--purple modal__btn modal__btn--fit-width"
        >
          Перейти в корзину
        </Link>
      </div>
    </>
  );
}
