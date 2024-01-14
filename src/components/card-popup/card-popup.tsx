import { Dispatch, SetStateAction } from 'react';

import { TCardPopup } from '../../types/card-popup';
import { decapitalizeFirstCharacter, formatPrice } from '../../utils/card';
import { Popup } from '../popup/popup';

type TCardPopupProps = {
  popupData: TCardPopup;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export function CardPopup({ popupData, onClose }: TCardPopupProps) {
  const {
    category,
    name,
    level,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    type,
    vendorCode,
  } = popupData;

  return (
    <Popup onClose={onClose}>
      <p className="title title--h4">Добавить товар в корзину</p>
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
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">
              {type} {decapitalizeFirstCharacter(category)}
            </li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(price)} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
      </div>
    </Popup>
  );
}
