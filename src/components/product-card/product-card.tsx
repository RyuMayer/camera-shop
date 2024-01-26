import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import { formatPrice } from '../../utils/card';
import { ProductTabs } from '../product-tabs/product-tabs';
import { Rating } from '../rating/rating';
import { AddToCartPopup } from '../add-to-cart-popup/add-to-cart-popup';
import { TCamera } from '../../types/camera';
import { Modal } from '../modal/modal';

type TProductCardProps = {
  data: TCamera;
};

export function ProductCard({ data: camera }: TProductCardProps) {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const onClose = (state = false) => {
    setIsPopupOpened(state);
  };

  return (
    <>
      <Helmet>
        <title>{camera.name}</title>
      </Helmet>
      <section className="product" data-testid="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`}
              />
              <img
                src={camera.previewImg}
                srcSet={`${camera.previewImg2x} 2x`}
                width={560}
                height={480}
                alt={`${camera.category} ${camera.name}`}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{`${camera.category} ${camera.name}`}</h1>
            <div className="rate product__rate">
              <Rating rating={camera.rating} />
              <p className="visually-hidden">Рейтинг: {camera.rating}</p>
              <p className="rate__count">
                <span className="visually-hidden">Всего оценок:</span>
                {camera.reviewCount}
              </p>
            </div>
            <p className="product__price">
              <span className="visually-hidden">Цена:</span>
              {formatPrice(camera.price)} ₽
            </p>
            <button
              onClick={() => setIsPopupOpened(true)}
              className="btn btn--purple"
              type="button"
              data-testid="cart-button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
            <ProductTabs camera={camera} />
          </div>
        </div>
      </section>
      <Modal onClose={onClose} isOpen={isPopupOpened}>
        <AddToCartPopup data={camera} />
      </Modal>
    </>
  );
}
