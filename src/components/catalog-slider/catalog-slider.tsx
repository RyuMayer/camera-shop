import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './catalog-slider.css';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectPromos } from '../../store/promo/promo.selector';
import { Link } from 'react-router-dom';
import { AppRoute, SLIDER_AUTOPLAY_DELAY } from '../../const';

export function CatalogSlider() {
  const promos = useAppSelector(selectPromos);

  return (
    <div
      className="banner"
      style={{ display: 'flex' }}
      data-testid="catalog-slider"
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        // FIXME: Доделать расположение пагинации!
        pagination={{ clickable: true }}
        allowTouchMove={false}
        autoplay={{ delay: SLIDER_AUTOPLAY_DELAY, pauseOnMouseEnter: true }}
      >
        {promos.map((promo) => (
          <SwiperSlide key={promo.id}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}
              />
              <img
                src={promo.previewImg}
                srcSet={`${promo.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt={promo.name}
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{promo.name}</span>
              <span className="banner__text">
                Профессиональная камера от известного производителя
              </span>
              <Link to={`${AppRoute.Product}/${promo.id}`} className="btn">
                Подробнее
              </Link>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
