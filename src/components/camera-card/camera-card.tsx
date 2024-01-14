import { AsyncImage } from 'loadable-image';

import './camera-card.css';

import { TCamera } from '../../types/camera';
import { CardRating } from '../card-rating/card-rating';
import { formatPrice } from '../../utils/card';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CardPopup } from '../card-popup/card-popup';

type TCameraCardProps = {
  cameraData: TCamera;
};

export function CameraCard({ cameraData }: TCameraCardProps) {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const {
    name,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    reviewCount,
    price,
    rating,
    category,
    level,
    type,
    vendorCode,
  } = cameraData;

  return (
    <>
      <div className="product-card">
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
            <CardRating rating={rating} />
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
          <a className="btn btn--transparent" href="#">
            Подробнее
          </a>
        </div>
      </div>
      {/* //TODO: Разбить на более мелкие компоненты? */}
      {isPopupOpened &&
        createPortal(
          <CardPopup
            onClose={setIsPopupOpened}
            popupData={{
              category,
              level,
              name,
              previewImg,
              previewImg2x,
              previewImgWebp,
              previewImgWebp2x,
              price,
              type,
              vendorCode,
            }}
          />,
          document.querySelector('main') as HTMLElement,
        )}
    </>
  );
}
