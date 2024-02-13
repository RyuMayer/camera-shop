import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type TAddToCartSuccessPopupProps = {
  onClose: (state?: boolean) => void;
};

export function AddToCartSuccessPopup({
  onClose,
}: TAddToCartSuccessPopupProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <Link
          to={AppRoute.Catalog}
          onClick={handleLinkClick}
          className="btn btn--transparent modal__btn"
        >
          Продолжить покупки
        </Link>
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
