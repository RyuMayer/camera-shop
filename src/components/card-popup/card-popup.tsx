import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { closePopup } from '../../store/card-popup/card-popup';
import { selectCardPopupData } from '../../store/card-popup/card-popup.selector';
import { decapitalizeFirstCharacter, formatPrice } from '../../utils/card';

export function CardPopup() {
  const dispatch = useAppDispatch();

  const cardData = useAppSelector(selectCardPopupData);

  const handleCloseBtnClick = () => {
    dispatch(closePopup());
  };

  useEffect(() => {
    document.body.classList.add('scroll-lock');

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);

  return (
    cardData && (
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${cardData.previewImgWebp}, ${cardData.previewImgWebp2x} 2x`}
                  />
                  <img
                    src={cardData.previewImg}
                    srcSet={`${cardData.previewImg2x} 2x`}
                    width={140}
                    height={120}
                    alt={`${cardData.category} ${cardData.name}`}
                  />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{cardData.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул: </span>
                    <span className="basket-item__number">
                      {cardData.vendorCode}
                    </span>
                  </li>
                  <li className="basket-item__list-item">
                    {cardData.type}{' '}
                    {decapitalizeFirstCharacter(cardData.category)}
                  </li>
                  <li className="basket-item__list-item">
                    {cardData.level} уровень
                  </li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>
                  {formatPrice(cardData.price)} ₽
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
            <button
              onClick={() => handleCloseBtnClick()}
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  );
}
