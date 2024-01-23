import { useState } from 'react';
import { AsyncImage } from 'loadable-image';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

import './camera-card.css';

import { TCamera } from '../../types/camera';
import { Rating } from '../rating/rating';
import { formatPrice } from '../../utils/card';
import { AddToCartPopup } from '../add-to-cart-popup/add-to-cart-popup';
import { AppRoute } from '../../const';
import { Popup } from '../popup/popup';

type TCameraCardProps = {
  cameraData: TCamera;
};

export function CameraCard({ cameraData }: TCameraCardProps) {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const onClose = (state = false) => {
    setIsPopupOpened(state);
  };

  const {
    id,
    name,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    reviewCount,
    price,
    rating,
  } = cameraData;

  return (
    <>
      <div className="product-card" data-testid="camera-card">
        <div className="product-card__img">
          <AsyncImage
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            alt={name}
            style={{ width: 280, height: 240 }}
            sources={[
              {
                type: 'image/webp',
                srcSet: `${previewImgWebp}, ${previewImgWebp2x} 2x`,
              },
            ]}
          />
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <Rating rating={rating} />
            <p className="visually-hidden">Рейтинг: {rating}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>
              {reviewCount}
            </p>
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(price)} ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button
            onClick={() => setIsPopupOpened(true)}
            className="btn btn--purple product-card__btn"
            type="button"
          >
            Купить
          </button>
          <Link
            to={`${AppRoute.Product}/${id}`}
            className="btn btn--transparent"
          >
            Подробнее
          </Link>
        </div>
      </div>
      {isPopupOpened &&
        createPortal(
          <Popup onClose={onClose}>
            <AddToCartPopup data={cameraData} />
          </Popup>,
          document.querySelector('main') as HTMLElement,
        )}
    </>
  );
}
