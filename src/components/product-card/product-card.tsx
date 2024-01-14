import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCamera } from '../../store/camera/camera.selector';
import { formatPrice } from '../../utils/card';
import { Rating } from '../rating/rating';

export function ProductCard() {
  const camera = useAppSelector(selectCamera);

  //FIXME: Как проверить лучше?
  if (!camera) return null;

  console.log(camera);

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
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className="tabs__control" type="button">
                Характеристики
              </button>
              <button className="tabs__control is-active" type="button">
                Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className="tabs__element">
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> DA4IU67AD5</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">Видеокамера</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">Коллекционная</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">Любительский</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
                <div className="product__tabs-text">
                  <p>
                    Немецкий концерн BRW разработал видеокамеру Das Auge IV
                    в&nbsp;начале 80-х годов, однако она до&nbsp;сих пор
                    пользуется популярностью среди коллекционеров
                    и&nbsp;яростных почитателей старинной техники.
                  </p>
                  <p>
                    Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству
                    аналоговой съёмки, заказав этот чудо-аппарат. Кто знает,
                    может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь
                    к&nbsp;наградам всех престижных кинофестивалей.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
