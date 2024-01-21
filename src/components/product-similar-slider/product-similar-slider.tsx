import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './product-similar-slider.css';

import { CameraCard } from '../camera-card/camera-card';
import { Navigation } from 'swiper/modules';
import { TCamera } from '../../types/camera';

type TProductSimilarSliderProps = {
  similar: TCamera[];
};

export function ProductSimilarSlider({ similar }: TProductSimilarSliderProps) {
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
            centerInsufficientSlides
            className="product-similar__slider-list"
          >
            {similar.map((item) => (
              <SwiperSlide key={item.id}>
                <CameraCard cameraData={item} />
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
