import { useEffect, useRef } from 'react';

import { decapitalizeFirstCharacter, formatPrice } from '../../utils/card';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { addToCart } from '../../store/cart/cart';
import { TCamera } from '../../types/camera';

type TAddToCartPopupProps = {
  data: TCamera;
  onAddedSuccess: () => void;
};

export function AddToCartPopup({ data, onAddedSuccess }: TAddToCartPopupProps) {
  const dispatch = useAppDispatch();

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
  } = data;

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCartBtn = () => {
    dispatch(addToCart({ product: data }));
    onAddedSuccess();
  };

  useEffect(() => {
    let isMounted = true;

    if (btnRef.current && isMounted) {
      btnRef.current.focus();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
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
          ref={btnRef}
          onClick={handleAddToCartBtn}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
      </div>
    </>
  );
}
