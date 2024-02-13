import { MouseEvent } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { deleteFromCart } from '../../store/cart/cart';
import { TCamera } from '../../types/camera';
import { decapitalizeFirstCharacter } from '../../utils/card';

type TCartDeletePopupProps = {
  product: TCamera;
  onClose: () => void;
};

export function CartDeletePopup({ product, onClose }: TCartDeletePopupProps) {
  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    category,
    name,
    vendorCode,
    type,
    level,
  } = product;

  const dispatch = useAppDispatch();

  const handleDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(deleteFromCart({ product }));
    onClose();
  };

  const handleCloseBtnClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    onClose();
  };

  return (
    <>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
            />
            <img
              src={previewImg}
              srcSet={`${previewImg2x} 2x`}
              width={140}
              height={120}
              alt={`${category} ${name}`}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">
              {type} {decapitalizeFirstCharacter(category)}
            </li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          onClick={handleDeleteBtnClick}
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
        >
          Удалить
        </button>
        <a
          onClick={handleCloseBtnClick}
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
        >
          Продолжить покупки
        </a>
      </div>
    </>
  );
}
