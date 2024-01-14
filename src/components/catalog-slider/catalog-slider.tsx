import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import './catalog-slider.css';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchPromo } from '../../store/promo/promo.action';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectLoadedStatus,
  selectLoadingStatus,
  selectPromos,
} from '../../store/promo/promo.selector';
import { Loading } from '../loading/loading';

export function CatalogSlider() {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(selectPromos);
  const promosLoadingStatus = useAppSelector(selectLoadingStatus);
  const isPromosLoaded = useAppSelector(selectLoadedStatus);

  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  return (
    <Loading loadingStatus={promosLoadingStatus} isDataLoaded={isPromosLoaded}>
      <div className="banner" style={{ display: 'flex' }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          // FIXME: Доделать расположение пагинации!
          pagination={{ clickable: true }}
          allowTouchMove={false}
          //FIXME: Убрать в константу
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
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
                  Профессиональная камера от&nbsp;известного производителя
                </span>
                {/* TODO: Не забыть перенаправление! */}
                <a className="btn" href="#">
                  Подробнее
                </a>
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Loading>
  );
}
