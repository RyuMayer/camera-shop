import { useEffect } from 'react';
import { Filter } from '../../components/filter/filter';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCameras } from '../../store/cameras/cameras.action';

export function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameras());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="banner">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
            />
            <img
              src="img/content/banner-bg.jpg"
              srcSet="img/content/banner-bg@2x.jpg 2x"
              width={1280}
              height={280}
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">
              Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
            </span>
            <span className="banner__text">
              Профессиональная камера от&nbsp;известного производителя
            </span>
            <a className="btn" href="#">
              Подробнее
            </a>
          </p>
        </div>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filter />
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input
                              type="radio"
                              id="sortPrice"
                              name="sort"
                              defaultChecked
                            />
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort" />
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input
                              type="radio"
                              id="up"
                              name="sort-icon"
                              defaultChecked
                              aria-label="По возрастанию"
                            />
                            <label htmlFor="up">
                              <svg width={16} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-sort" />
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input
                              type="radio"
                              id="down"
                              name="sort-icon"
                              aria-label="По убыванию"
                            />
                            <label htmlFor="down">
                              <svg width={16} height={14} aria-hidden="true">
                                <use xlinkHref="#icon-sort" />
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="cards catalog__cards">
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"
                          />
                          <img
                            src="img/content/das-auge.jpg"
                            srcSet="img/content/das-auge@2x.jpg 2x"
                            width={280}
                            height={240}
                            alt="Ретрокамера «Das Auge IV»"
                          />
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-star" />
                          </svg>
                          <p className="visually-hidden">Рейтинг: 3</p>
                          <p className="rate__count">
                            <span className="visually-hidden">
                              Всего оценок:
                            </span>
                            23
                          </p>
                        </div>
                        <p className="product-card__title">
                          Ретрокамера Das Auge IV
                        </p>
                        <p className="product-card__price">
                          <span className="visually-hidden">Цена:</span>73 450 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button
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
                  </div>
                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--active"
                          href={1}
                        >
                          1
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href={2}>
                          2
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href={3}>
                          3
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--text"
                          href={2}
                        >
                          Далее
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}