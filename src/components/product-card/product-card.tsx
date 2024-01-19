import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCamera } from '../../store/camera/camera.selector';
import { formatPrice } from '../../utils/card';
import { ProductTabs } from '../product-tabs/product-tabs';
import { Rating } from '../rating/rating';

export function ProductCard() {
  const camera = useAppSelector(selectCamera);

  //FIXME: Как проверить лучше?
  if (!camera) return null;

  return (
    <section className="product">
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
          <button className="btn btn--purple" type="button">
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <ProductTabs camera={camera} />
        </div>
      </div>
    </section>
  );
}