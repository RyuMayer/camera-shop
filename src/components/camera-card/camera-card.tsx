import { AsyncImage } from 'loadable-image';

import './camera-card.css';

import { TCamera } from '../../types/camera';
import { CardRating } from '../card-rating/card-rating';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { openPopup } from '../../store/card-popup/card-popup';
import { TCardPopup } from '../../types/card-popup';
import { formatPrice } from '../../utils/card';

type TCameraCardProps = {
  cameraData: TCamera;
};

export function CameraCard({ cameraData }: TCameraCardProps) {
  const dispatch = useAppDispatch();

  const {
    name,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    reviewCount,
    price,
    rating,
  } = cameraData;

  const handleBuyBtnClick = () => {
    //FIXME: Как-то сократить?
    const popupData: TCardPopup = {
      category: cameraData.category,
      level: cameraData.level,
      name: cameraData.name,
      previewImg: cameraData.previewImg,
      previewImg2x: cameraData.previewImg2x,
      previewImgWebp: cameraData.previewImg2x,
      previewImgWebp2x: cameraData.previewImgWebp2x,
      price: cameraData.price,
      type: cameraData.type,
      vendorCode: cameraData.vendorCode,
    };

    dispatch(openPopup(popupData));
  };

  return (
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
          onClick={() => handleBuyBtnClick()}
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
  );
}
