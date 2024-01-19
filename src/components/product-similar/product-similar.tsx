import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './product-similar.css';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectSimilar } from '../../store/similar/similar.selector';
import { CameraCard } from '../camera-card/camera-card';
import { Navigation } from 'swiper/modules';

export function ProductSimilar() {
  const similar = useAppSelector(selectSimilar);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper
            navigation={{
              enabled: true,
              prevEl: '.slider-controls--prev',
              nextEl: '.slider-controls--next',
            }}
            modules={[Navigation]}
            slidesPerView="auto"
            watchSlidesProgress
            allowTouchMove={false}
            slidesPerGroup={3}
            className="product-similar__slider-list"
          >
            {similar.map((data) => (
              <SwiperSlide key={data.id}>
                <CameraCard cameraData={data} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
