import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';

import { TCamera } from '../../types/camera';
import { decapitalizeFirstCharacter, formatPrice } from '../../utils/card';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  addToCart,
  changeItemNumberInCart,
  removeFromCart,
} from '../../store/cart/cart';
import { Modal } from '../modal/modal';
import { CartDeletePopup } from '../cart-delete-popup/cart-delete-popup';
import {
  MAX_NUMBER_PRODUCT_IN_CART,
  MIN_NUMBER_PRODUCT_IN_CART,
} from './cart-item.const';

type TCartItemProps = {
  product: TCamera;
  numberInCart: number;
};

export function CartItem({ product, numberInCart }: TCartItemProps) {
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
    price,
  } = product;

  const [valueInput, setValueInput] = useState(numberInCart.toString());
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const dispatch = useAppDispatch();

  const totalPrice = numberInCart * price;

  const onClose = () => {
    setIsPopupOpened(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValueInput(value);
  };

  const handleInputBlur = () => {
    const numberValue = parseInt(valueInput, 10);

    if (
      isNaN(numberValue) ||
      numberValue < MIN_NUMBER_PRODUCT_IN_CART ||
      numberValue > MAX_NUMBER_PRODUCT_IN_CART
    ) {
      dispatch(changeItemNumberInCart({ product, count: 1 }));
      setValueInput('1');
    } else {
      dispatch(changeItemNumberInCart({ product, count: numberValue }));
      setValueInput(numberValue.toString());
    }
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleInputBlur();
    }
  };

  const handleIncreaseBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart({ product }));
  };

  const handleDescreaseBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeFromCart({ product }));
  };

  useEffect(() => {
    setValueInput(numberInCart.toString());
  }, [numberInCart]);

  return (
    <>
      <li className="basket-item" data-testid="basket-item">
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
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrice(price)} ₽
        </p>
        <div className="quantity">
          <button
            onClick={handleDescreaseBtnClick}
            className="btn-icon btn-icon--prev"
            aria-label="уменьшить количество товара"
            disabled={numberInCart <= MIN_NUMBER_PRODUCT_IN_CART}
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter1" />
          <input
            type="text"
            id="counter1"
            value={valueInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeydown}
            aria-label="количество товара"
          />
          <button
            onClick={handleIncreaseBtnClick}
            className="btn-icon btn-icon--next"
            aria-label="увеличить количество товара"
            disabled={numberInCart >= MAX_NUMBER_PRODUCT_IN_CART}
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price">
          <span className="visually-hidden">Общая цена:</span>
          {formatPrice(totalPrice)} ₽
        </div>
        <button
          onClick={() => setIsPopupOpened(true)}
          className="cross-btn"
          type="button"
          aria-label="Удалить товар"
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </li>
      <Modal onClose={onClose} isOpen={isPopupOpened} isNarrow={false}>
        <CartDeletePopup product={product} onClose={onClose} />
      </Modal>
    </>
  );
}
